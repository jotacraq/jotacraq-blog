export interface ArticleDraft {
  title: string;
  subtitle: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  tags: string;
  content: string;
}

export interface ArticleDraftValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ArticleDraft, string>>;
}
