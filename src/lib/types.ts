export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  year: number;
  client: string;
  imageUrl: string;
  media: { type: 'image' | 'video'; url: string }[];
};
