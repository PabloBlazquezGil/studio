// This file is no longer the primary source of truth for content.
// The website now fetches data dynamically from Firebase Firestore.
// You can manage your content from the /admin panel after logging in.

// The data below is kept as a reference or for fallback purposes if needed.

import type { Project, Author, SiteSettings } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getUrl = (id: string) => PlaceHolderImages.find(p => p.id === id)?.imageUrl || '';

export const projects: Project[] = [];
export const author: Author | null = null;
export const siteSettings: SiteSettings | null = null;
