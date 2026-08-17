// types.ts
export type Destination = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  alt?: string;
  tags?: string[];
  url?: string;
};
