import type { Project, Author, SiteSettings } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getUrl = (id: string) => PlaceHolderImages.find(p => p.id === id)?.imageUrl || '';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Ecos Alpinos',
    category: 'Paisaje',
    description: 'Una mañana tranquila en los Alpes suizos, capturando la primera luz que golpea las cimas. El aire era fresco y el silencio solo lo rompía el sonido lejano de una cascada.',
    year: 2023,
    client: 'Nature Geographic',
    imageUrl: getUrl('gallery-1'),
    media: [{ type: 'image', url: getUrl('gallery-1') }],
  },
  {
    id: 'proj-2',
    title: 'Sueños de Neón',
    category: 'Paisaje Urbano',
    description: 'Las vibrantes calles de Tokio después de la medianoche, una sinfonía de luz y movimiento. Esta toma busca capturar la energía y la soledad de la ciudad por la noche.',
    year: 2022,
    client: 'Wired Magazine',
    imageUrl: getUrl('gallery-2'),
    media: [{ type: 'image', url: getUrl('gallery-2') }, { type: 'image', url: 'https://picsum.photos/seed/202/800/1200' }],
  },
  {
    id: 'proj-3',
    title: 'La Mirada',
    category: 'Retrato',
    description: 'Un retrato íntimo que captura la emoción cruda y la vulnerabilidad. Los ojos del sujeto cuentan una historia de resiliencia y esperanza.',
    year: 2024,
    client: 'Vogue',
    imageUrl: getUrl('gallery-3'),
    media: [{ type: 'image', url: getUrl('gallery-3') }],
  },
  {
    id: 'proj-4',
    title: 'Jungla de Concreto',
    category: 'Arquitectura',
    description: 'Explorando la geometría y la escala de los edificios modernos. Un estudio de líneas, sombras y reflejos en un entorno urbano.',
    year: 2023,
    client: 'ArchDaily',
    imageUrl: getUrl('gallery-4'),
    media: [{ type: 'image', url: getUrl('gallery-4') }],
  },
  {
    id: 'proj-5',
    title: 'Bosques Susurrantes',
    category: 'Naturaleza',
    description: 'Un paseo tranquilo por un bosque milenario, con rayos de sol que atraviesan el denso dosel. Un momento de pura paz.',
    year: 2022,
    client: 'Autoiniciado',
    imageUrl: getUrl('gallery-5'),
    media: [{ type: 'image', url: getUrl('gallery-5') }],
  },
  {
    id: 'proj-6',
    title: 'Mareas Azules',
    category: 'Paisaje Marino',
    description: 'El movimiento poderoso e implacable del océano contra la roca volcánica. Un testimonio de la fuerza de la naturaleza.',
    year: 2024,
    client: 'Patagonia',
    imageUrl: getUrl('gallery-6'),
    media: [{ type: 'image', url: getUrl('gallery-6') }],
  },
  {
    id: 'proj-7',
    title: 'Big Buck Bunny',
    category: 'Cortometraje de Animación',
    description: 'Un conejo grande y adorable llamado Big Buck se despierta en su madriguera y se enfrenta a tres molestos roedores: Frank, Rinky y Gamera.',
    year: 2008,
    client: 'Blender Foundation',
    imageUrl: `https://picsum.photos/seed/proj-7/1280/720`,
    media: [{ type: 'video', url: getUrl('video-card-1') }],
  },
  {
    id: 'proj-8',
    title: 'Elephants Dream',
    category: 'Cortometraje de Animación',
    description: 'Emo y Proog, dos personas con visiones muy diferentes del mundo, exploran un extraño y surrealista mundo mecánico que reacciona a sus pensamientos y emociones.',
    year: 2006,
    client: 'Blender Foundation',
    imageUrl: `https://picsum.photos/seed/proj-8/1280/720`,
    media: [{ type: 'video', url: getUrl('video-card-2') }],
  },
];

export const author: Author = {
  id: 'main-author',
  name: 'Pablo Blázquez Gil',
  title: 'Un Narrador Detrás del Lente',
  bio: `Mi nombre es Pablo Blázquez Gil. Con una pasión por la narrativa visual, he pasado más de una década perfeccionando mi arte, transformando momentos fugaces en historias atemporales. Mi trabajo es una mezcla de arte cinematográfico y emoción auténtica, buscando la belleza tanto en lo grandioso como en lo sutil.\n\nDesde campañas comerciales hasta proyectos personales, abordo cada fotograma con intención y el deseo de conectar con el espectador a un nivel más profundo. Creemos algo inolvidable juntos.`,
  imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMG1hbnxlbnwwfHx8fDE3Njk2NzE4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export const siteSettings: SiteSettings = {
  id: 'main',
  heroVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  heroPosterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjaW5lbWF8ZW58MHx8fHwxNzY5NzU1MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080'
};
