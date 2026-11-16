# Fotos AVIF y pósters de vídeo

Generado por `scripts/media/optimize.py` (GitHub Actions, workflow «Optimizar medios»).
Regla: se usa la calidad AVIF más baja con **SSIMULACRA2 ≥ 90** frente al original
(a partir de 90 no se distingue del original a distancia normal de visión; 100 = idéntico),
en 4:4:4 (sin submuestreo de color) y conservando el perfil ICC. Si a esa calidad no pesa al
menos un 20% menos que el JPG, o ninguna calidad llega al umbral, la foto se queda
con el JPG: no compensa cambiar una foto que ya se ve bien. El JPG original no se toca y
la web lo sigue sirviendo a los navegadores sin AVIF.

## Fotos

| Foto | JPG original | AVIF tamaño completo | AVIF 2048 px |
| --- | --- | --- | --- |
| `PBG01270-scaled.jpg` | 1600×2400, 446 KB | descartado (sin pérdida visible solo ahorra un 6 %) | — |
| `PBG01148-scaled.jpg` | 1600×2400, 325 KB | descartado (sin pérdida visible solo ahorra un 1 %) | — |
| `PBG01125-scaled.jpg` | 1600×2400, 301 KB | descartado (sin pérdida visible pesa un 12 % más que el JPG) | — |
| `PBG01051-scaled.jpg` | 1600×2400, 280 KB | descartado (ninguna calidad llega a 90) | — |
| `PBG01031-scaled.jpg` | 1600×2400, 241 KB | descartado (sin pérdida visible solo ahorra un 10 %) | — |
| `PBG00922-scaled.jpg` | 1487×2560, 405 KB | descartado (sin pérdida visible pesa un 49 % más que el JPG) | — |
| `1710610037469-scaled.jpg` | 1600×2400, 498 KB | descartado (sin pérdida visible pesa un 38 % más que el JPG) | — |

## Pósters (un fotograma por clip del carrusel)

| Vídeo | Fotograma | Póster AVIF |
| --- | --- | --- |
| `Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA.mp4` | 1920×1080 | 62 KB · q80 · SSIMULACRA2 92.06 · PSNR 50.49 dB |
| `SHORT-FILM-CASA-BEATNIK-1080.mp4` | 1080×1920 | 433 KB · q88 · SSIMULACRA2 90.01 · PSNR 43.3 dB |
| `Trailer-PhDays2023-Centro-de-Astrobiologia.mp4` |  | descartado (ninguna calidad llega a 90) |
| `Short-Film-San-Lorenzo-1.mp4` | 1080×1920 | 558 KB · q92 · SSIMULACRA2 90.01 · PSNR 45.37 dB |
