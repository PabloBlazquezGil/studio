import type { Project, Author, SiteSettings, ClientLogo } from './types';

// URLs de imágenes de marcador de posición. Reemplázalas con las URLs de tu propio hosting.
const photoProjectImages = [
  'https://images.unsplash.com/photo-1612539473441-dfc1cefd5e1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1506606401543-2e73709cebb4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1617761141732-d481912af1a9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1623967680551-3e4694e2c9ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1615472768508-9db82090f4c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3'
];

const videoProjectPosterImages = [
    'https://images.unsplash.com/photo-1518976029348-1031398939b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1614926120485-0c5897f11e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
]

const videoUrls = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://thundershoot.com/wp-content/uploads/2024/11/Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA.mp4"
];

export const projects: Project[] = [
  { id: '1', title: 'Montañas Serenas', category: 'Paisaje', year: 2023, client: 'Revista Aventura', imageUrl: photoProjectImages[0], description: 'Una exploración fotográfica de los picos más remotos.', media: [{ type: 'image', url: photoProjectImages[0] }] },
  { id: '2', title: 'Noches de Neón', category: 'Urbano', year: 2022, client: 'Galería Urbana', imageUrl: photoProjectImages[1], description: 'Capturando la vibrante energía de la ciudad después del anochecer.', media: [{ type: 'image', url: photoProjectImages[1] }] },
  { id: '3', title: 'Retrato Íntimo', category: 'Retrato', year: 2024, client: 'Cliente Privado', imageUrl: photoProjectImages[2], description: 'Un estudio sobre la expresión y la emoción humana.', media: [{ type: 'image', url: photoProjectImages[2] }] },
  { id: '4', title: 'Formas y Sombras', category: 'Arquitectura', year: 2023, client: 'Estudio de Arquitectos', imageUrl: photoProjectImages[3], description: 'Juego de luces y sombras en la arquitectura moderna.', media: [{ type: 'image', url: photoProjectImages[3] }] },
  { id: '5', title: 'El Sendero Verde', category: 'Naturaleza', year: 2022, client: 'Fundación Ecológica', imageUrl: photoProjectImages[4], description: 'Un viaje a través de los bosques más frondosos.', media: [{ type: 'image', url: photoProjectImages[4] }] },
  { id: '6', title: 'Fuerza del Mar', category: 'Marítimo', year: 2023, client: 'Marca de Surf', imageUrl: photoProjectImages[5], description: 'El poder indomable de las olas del océano.', media: [{ type: 'image', url: photoProjectImages[5] }] },
  { id: '7', title: 'Big Buck Bunny', category: 'Animación', year: 2008, client: 'Blender Foundation', imageUrl: videoProjectPosterImages[0], description: 'Un cortometraje animado sobre un conejo gigante y sus amigos del bosque.', media: [{ type: 'video', url: videoUrls[0] }, {type: 'image', url: videoProjectPosterImages[0]}] },
  { id: '8', title: 'Elephants Dream', category: 'Ciencia Ficción', year: 2006, client: 'Blender Foundation', imageUrl: videoProjectPosterImages[1], description: 'Dos personajes exploran un mundo surrealista y cambiante.', media: [{ type: 'video', url: videoUrls[1] }, {type: 'image', url: videoProjectPosterImages[1]}] },
  { id: '9', title: 'Día de la Mujer y la Niña en la Ciencia', category: 'Divulgación Científica', year: 2024, client: 'Centro de Astrobiología (CAB, CSIC-INTA)', imageUrl: videoProjectPosterImages[2], description: 'Un vídeo conmemorativo para el Centro de Astrobiología con motivo del Día Internacional de la Mujer y la Niña en la Ciencia, buscando inspirar a nuevas generaciones y visibilizar el papel de las mujeres en la investigación espacial.', media: [{ type: 'video', url: videoUrls[2] }, {type: 'image', url: videoProjectPosterImages[2]}] },
];

export const author: Author = {
  id: 'main-author',
  name: 'Pablo Blázquez Gil',
  title: 'Un Narrador Detrás del Lente',
  bio: `Mi nombre es Pablo Blázquez Gil. Con una pasión por la narrativa visual, he pasado más de una década perfeccionando mi arte, transformando momentos fugaces en historias atemporales. Mi trabajo es una mezcla de arte cinematográfico y emoción auténtica, buscando la belleza tanto en lo grandioso como en lo sutil.\n\nDesde campañas comerciales hasta proyectos personales, abordo cada fotograma con intención y el deseo de conectar con el espectador a un nivel más profundo. Creemos algo inolvidable juntos.`,
  imageUrl: 'https://thundershoot.com/wp-content/uploads/2026/02/1710610037469-scaled.jpg',
};

export const siteSettings: SiteSettings = {
    id: 'main',
    heroVideoUrl: 'https://thundershoot.com/wp-content/uploads/2024/11/Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA.mp4#t=5',
    heroPosterUrl: 'https://images.unsplash.com/photo-1614926120485-0c5897f11e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
};

export const clientLogos: ClientLogo[] = [
    { id: '1', clientName: 'Cliente 1', logoUrl: 'https://thundershoot.com/wp-content/uploads/2025/02/0.png' },
    { id: '2', clientName: 'Cliente 2', logoUrl: 'https://thundershoot.com/wp-content/uploads/2025/01/LOGO_PNG.png' },
    { id: '3', clientName: 'Cliente 3', logoUrl: 'https://thundershoot.com/wp-content/uploads/2024/11/images-2.png' },
    { id: '4', clientName: 'Cliente 4', logoUrl: 'https://thundershoot.com/wp-content/uploads/2024/11/EANA_logo-2.png' },
];
