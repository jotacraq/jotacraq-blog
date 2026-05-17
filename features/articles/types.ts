export type Article = {
  title: string;
  subtitle: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
  content: string;
  readingTimeMinutes: number;
};
