"""
Genera versiones AVIF de las fotos JPG y un póster por cada vídeo del carrusel, solo si no hay
pérdida visible.

Para cada foto prueba calidades AVIF de menor a mayor y se queda con la primera que cumple:
  - SSIMULACRA2 >= UMBRAL frente al original (90 = «visualmente sin pérdida»), y
  - pesa al menos un 20 % menos que el JPG original. Si el ahorro es menor, no compensa cambiar
    la foto que ya se ve bien y se queda con el JPG.
Si ninguna calidad lo cumple, la foto se queda solo con su JPG. El JPG original nunca se toca:
la web lo sigue usando como respaldo (<picture>).

La versión de 2048 px se compara con el original reducido a 2048 px (lo que haría el navegador).
Los pósters se comparan con el fotograma exacto sacado del vídeo, sin comprimir.

Se ejecuta en GitHub Actions (.github/workflows/media.yml) porque los medios viven en
archivos.thundershoot.com. Escribe:
  public/media/...                 los archivos generados
  src/data/media.json              qué foto/vídeo tiene versión optimizada (lo lee la web)
  docs/medios-optimizados.md       el informe con las métricas
"""

from __future__ import annotations

import io
import json
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps
from ssimulacra2 import compute_ssimulacra2

ROOT = Path(__file__).resolve().parents[2]
SOURCES = json.loads((Path(__file__).parent / 'sources.json').read_text())
OUT_PUBLIC = ROOT / 'public' / 'media'
MANIFEST = ROOT / 'src' / 'data' / 'media.json'
REPORT = ROOT / 'docs' / 'medios-optimizados.md'

UMBRAL = 90.0  # SSIMULACRA2: 90 o más = no se distingue del original a distancia normal de visión
CALIDADES = [80, 84, 88, 90, 92, 94, 96, 98, 100]
ANCHO_MEDIO = 2048
AHORRO_MINIMO = 0.20  # una foto solo pasa a AVIF si pesa al menos un 20 % menos que su JPG


def download(url: str, dest: Path) -> Path:
    req = urllib.request.Request(url, headers={'User-Agent': 'portfolio-media-optimizer'})
    with urllib.request.urlopen(req, timeout=120) as res, open(dest, 'wb') as fh:
        fh.write(res.read())
    return dest


def psnr(a: Image.Image, b: Image.Image) -> float:
    x = np.asarray(a.convert('RGB'), dtype=np.float64)
    y = np.asarray(b.convert('RGB'), dtype=np.float64)
    mse = np.mean((x - y) ** 2)
    return float('inf') if mse == 0 else float(10 * np.log10(255.0**2 / mse))


def encode_avif(img: Image.Image, quality: int, icc: bytes | None) -> bytes:
    buf = io.BytesIO()
    kwargs = {'quality': quality, 'subsampling': '4:4:4', 'speed': 4}
    if icc:
        kwargs['icc_profile'] = icc
    img.save(buf, format='AVIF', **kwargs)
    return buf.getvalue()


def best_avif(ref: Image.Image, icc: bytes | None, max_bytes: int | None, tmp: Path) -> dict | None:
    """Primera calidad que no se distingue del original (y pesa menos que max_bytes, si se da)."""
    ref_png = tmp / 'ref.png'
    ref.save(ref_png)
    tried = []
    for q in CALIDADES:
        data = encode_avif(ref, q, icc)
        dist_png = tmp / 'dist.png'
        decoded = Image.open(io.BytesIO(data)).convert('RGB')
        decoded.save(dist_png)
        score = float(compute_ssimulacra2(str(ref_png), str(dist_png)))
        p = psnr(ref, decoded)
        tried.append({'q': q, 'ssimulacra2': round(score, 2), 'psnr': round(p, 2), 'bytes': len(data)})
        print(f'    q={q}: SSIMULACRA2={score:.2f} PSNR={p:.2f} dB {len(data) / 1024:.0f} KB', flush=True)
        if score >= UMBRAL:
            if max_bytes is not None and len(data) > max_bytes * (1 - AHORRO_MINIMO):
                ahorro = 100 * (1 - len(data) / max_bytes)
                reason = (f'sin pérdida visible solo ahorra un {ahorro:.0f} %' if ahorro > 0
                          else f'sin pérdida visible pesa un {-ahorro:.0f} % más que el JPG')
                return {'ok': False, 'reason': reason, 'tried': tried}
            return {'ok': True, 'data': data, **tried[-1], 'tried': tried}
    return {'ok': False, 'reason': f'ninguna calidad llega a {UMBRAL:.0f}', 'tried': tried}


def process_photo(path: str, tmp: Path) -> dict:
    url = SOURCES['base'] + path
    src = download(url, tmp / 'src.jpg')
    jpg_bytes = src.stat().st_size
    img = Image.open(src)
    icc = img.info.get('icc_profile')
    img = ImageOps.exif_transpose(img).convert('RGB')
    w, h = img.size
    stem = Path(path).stem
    entry: dict = {'jpg': {'width': w, 'height': h, 'bytes': jpg_bytes}}
    print(f'{path} ({w}x{h}, {jpg_bytes / 1024:.0f} KB)', flush=True)

    print('  tamaño completo', flush=True)
    full = best_avif(img, icc, jpg_bytes, tmp)
    entry['full'] = {k: v for k, v in full.items() if k != 'data'}
    if full['ok']:
        rel = f'/media/fotos/{stem}.avif'
        (OUT_PUBLIC / 'fotos').mkdir(parents=True, exist_ok=True)
        (ROOT / 'public' / rel.lstrip('/')).write_bytes(full['data'])
        entry['full'].update({'src': rel, 'width': w, 'height': h})

    if w > ANCHO_MEDIO:
        mh = round(h * ANCHO_MEDIO / w)
        small = img.resize((ANCHO_MEDIO, mh), Image.Resampling.LANCZOS)
        print(f'  {ANCHO_MEDIO} px', flush=True)
        mid = best_avif(small, icc, jpg_bytes, tmp)
        entry['mid'] = {k: v for k, v in mid.items() if k != 'data'}
        if mid['ok']:
            rel = f'/media/fotos/{stem}-{ANCHO_MEDIO}.avif'
            (OUT_PUBLIC / 'fotos').mkdir(parents=True, exist_ok=True)
            (ROOT / 'public' / rel.lstrip('/')).write_bytes(mid['data'])
            entry['mid'].update({'src': rel, 'width': ANCHO_MEDIO, 'height': mh})
    return entry


def process_video(video: dict, tmp: Path) -> dict:
    path, t = video['path'], video['time']
    url = SOURCES['base'] + path
    if t == 'middle':
        # Los primeros segundos de algunos vídeos son una portada que no queremos de póster:
        # se usa un fotograma de la mitad del vídeo.
        dur = subprocess.run(
            ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', url],
            check=True, capture_output=True, text=True,
        ).stdout.strip()
        t = round(float(dur) / 2, 2)
    frame = tmp / 'frame.png'
    frame.unlink(missing_ok=True)
    # -ss después de -i: búsqueda exacta, el fotograma que se ve al empezar el vídeo
    subprocess.run(
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-i', url, '-ss', str(t), '-frames:v', '1',
         '-pix_fmt', 'rgb24', str(frame)],
        check=True,
    )
    img = Image.open(frame).convert('RGB')
    w, h = img.size
    print(f'{path} @ {t}s ({w}x{h})', flush=True)
    res = best_avif(img, None, None, tmp)
    entry = {k: v for k, v in res.items() if k != 'data'}
    if res['ok']:
        rel = f'/media/posters/{Path(path).stem}.avif'
        (OUT_PUBLIC / 'posters').mkdir(parents=True, exist_ok=True)
        (ROOT / 'public' / rel.lstrip('/')).write_bytes(res['data'])
        entry.update({'src': rel, 'width': w, 'height': h, 'time': t})
    return entry


def kb(n: int) -> str:
    return f'{n / 1024:,.0f} KB'.replace(',', '.')


def write_report(photos: dict, posters: dict) -> None:
    lines = [
        '# Fotos AVIF y pósters de vídeo',
        '',
        'Generado por `scripts/media/optimize.py` (GitHub Actions, workflow «Optimizar medios»).',
        f'Regla: se usa la calidad AVIF más baja con **SSIMULACRA2 ≥ {UMBRAL:.0f}** frente al original',
        '(a partir de 90 no se distingue del original a distancia normal de visión; 100 = idéntico),',
        'en 4:4:4 (sin submuestreo de color) y conservando el perfil ICC. Si a esa calidad no pesa al',
        f'menos un {AHORRO_MINIMO:.0%} menos que el JPG, o ninguna calidad llega al umbral, la foto se queda',
        'con el JPG: no compensa cambiar una foto que ya se ve bien. El JPG original no se toca y',
        'la web lo sigue sirviendo a los navegadores sin AVIF.',
        '',
        '## Fotos',
        '',
        '| Foto | JPG original | AVIF tamaño completo | AVIF 2048 px |',
        '| --- | --- | --- | --- |',
    ]

    def cell(r: dict | None, ref_bytes: int) -> str:
        if not r:
            return '—'
        if not r['ok']:
            return f"descartado ({r['reason']})"
        ahorro = 100 * (1 - r['bytes'] / ref_bytes)
        return f"{kb(r['bytes'])} (−{ahorro:.0f} %) · q{r['q']} · SSIMULACRA2 {r['ssimulacra2']} · PSNR {r['psnr']} dB"

    for path, e in photos.items():
        j = e['jpg']
        lines.append(
            f"| `{Path(path).name}` | {j['width']}×{j['height']}, {kb(j['bytes'])} | {cell(e.get('full'), j['bytes'])} | {cell(e.get('mid'), j['bytes'])} |"
        )
    lines += ['', '## Pósters (un fotograma por clip del carrusel)', '', '| Vídeo | Fotograma | Póster AVIF |', '| --- | --- | --- |']
    for path, e in posters.items():
        res = f"{kb(e['bytes'])} · q{e['q']} · SSIMULACRA2 {e['ssimulacra2']} · PSNR {e['psnr']} dB" if e['ok'] else f"descartado ({e['reason']})"
        size = f"{e['width']}×{e['height']}" if e['ok'] else ''
        lines.append(f"| `{Path(path).name}` | {size} | {res} |")
    REPORT.write_text('\n'.join(lines) + '\n')


def main() -> int:
    photos: dict = {}
    posters: dict = {}
    # Se regenera todo en cada ejecución: no quedan archivos de reglas anteriores.
    for old in OUT_PUBLIC.glob('*/*.avif'):
        old.unlink()
    with tempfile.TemporaryDirectory() as d:
        tmp = Path(d)
        for path in SOURCES['photos']:
            photos[path] = process_photo(path, tmp)
        for video in SOURCES['videos']:
            posters[video['path']] = process_video(video, tmp)

    manifest = {'base': SOURCES['base'], 'photos': {}, 'posters': {}}
    for path, e in photos.items():
        # Sin AVIF a tamaño completo no se usa ninguno: en pantallas grandes se perdería resolución.
        if not e['full']['ok']:
            continue
        versions = [v for v in (e.get('mid'), e.get('full')) if v and v['ok']]
        if versions:
            manifest['photos'][path] = [{'src': v['src'], 'width': v['width'], 'height': v['height']} for v in versions]
    for path, e in posters.items():
        if e['ok']:
            manifest['posters'][path] = {'src': e['src'], 'width': e['width'], 'height': e['height']}
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    write_report(photos, posters)
    (ROOT / 'docs' / 'medios-optimizados.json').write_text(json.dumps({'photos': photos, 'posters': posters}, indent=2) + '\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
