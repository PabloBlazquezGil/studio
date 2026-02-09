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

export const projects: Project[] = [
  { 
    id: '11', 
    title: 'Cartel EANA Conference', 
    category: 'Diseño de Cartel',
    year: 2023, 
    client: 'EANA', 
    imageUrl: 'https://thundershoot.com/wp-content/uploads/2024/11/Cartel-A0-final-scaled.jpg.webp', 
    description: 'Diseño del cartel para la EANA Conference, un congreso internacional para jóvenes astrobiólogos organizado en la Universidad Carlos III de Madrid.',
    media: [
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2024/11/Cartel-A0-final-scaled.jpg.webp' }
    ] 
  },
  { 
    id: '12', 
    title: 'Sesión de Surf en Malpica', 
    category: 'Fotografía Deportiva', 
    year: 2026, 
    client: 'Cliente Privado', 
    imageUrl: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07245_2048px.avif', 
    description: 'Capturando la energía y la pasión del surf en las olas de Malpica.',
    media: [
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07245_2048px.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG06887_2048px.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG06897_2048px-2.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07002_2048px.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07096_2048px.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07176_2048px.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07245_2048px.jpg' }
    ] 
  },
  { 
    id: '3', 
    title: 'Sesión Photobook Actriz', 
    category: 'Retrato', 
    year: 2026, 
    client: 'HelenaJes', 
    imageUrl: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07394-scaled.avif', 
    description: 'Sesión de photobook para la actriz HelenaJes, capturando su versatilidad y esencia para su portfolio profesional.', 
    media: [
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07394-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07352-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07289-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07294-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07343-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07275-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07358-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07376-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07389-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07390-Editar-scaled.avif' },
      { type: 'image', url: 'https://thundershoot.com/wp-content/uploads/2026/02/PBG07393-Editar-scaled.avif' }
    ] 
  },
  { 
    id: '9', 
    title: 'PhDays', 
    category: 'Evento Científico', 
    client: 'Centro de Astrobiología (CAB, CSIC-INTA)', 
    imageUrl: 'https://thundershoot.com/wp-content/uploads/2024/11/Trailer-PhDays2023-Centro-de-Astrobiologia.mp4', 
    description: 'Tráiler del congreso PhDays, un evento que reúne a estudiantes de doctorado para presentar sus investigaciones de vanguardia en el campo de la astrobiología.', 
    media: [
      { type: 'video', url: 'https://thundershoot.com/wp-content/uploads/2024/11/Trailer-PhDays2023-Centro-de-Astrobiologia.mp4#t=5' },
    ]
  },
    {
    id: '10',
    title: 'Día de la Mujer y la Niña en la Ciencia',
    category: 'Evento de Divulgación',
    year: 2024,
    client: 'Centro de Astrobiología (CAB, CSIC-INTA)',
    imageUrl: 'https://thundershoot.com/wp-content/uploads/2024/11/Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA.mp4',
    description: 'Vídeo conmemorativo para el Día Internacional de la Mujer y la Niña en la Ciencia, destacando el crucial papel de las mujeres en la astrobiología y la investigación espacial. Creado para el Centro de Astrobiología (CAB, CSIC-INTA).',
    media: [
      { type: 'video', url: 'https://thundershoot.com/wp-content/uploads/2024/11/Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA.mp4#t=5' },
    ]
  },
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
    heroPosterUrl: ''
};

export const clientLogos: ClientLogo[] = [
    { id: '1', clientName: 'Centro de Astrobiología', logoUrl: 'https://thundershoot.com/wp-content/uploads/2025/02/0.png' },
    { id: '2', clientName: 'CSIC', logoUrl: 'https://thundershoot.com/wp-content/uploads/2025/01/LOGO_PNG.png' },
    { id: '3', clientName: 'INTA', logoUrl: 'https://thundershoot.com/wp-content/uploads/2024/11/images-2.png' },
    { id: '4', clientName: 'EANA', logoUrl: 'https://thundershoot.com/wp-content/uploads/2024/11/EANA_logo-2.png.webp' },
];
