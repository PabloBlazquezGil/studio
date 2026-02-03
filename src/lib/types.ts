export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  year?: number;
  client: string;
  imageUrl: string;
  media: { type: 'image' | 'video'; url: string }[];
};

export type Author = {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
};

export type SiteSettings = {
    id: string;
    heroVideoUrl: string;
    heroPosterUrl: string;
};

export type ClientLogo = {
    id: string;
    logoUrl: string;
    clientName: string;
};
