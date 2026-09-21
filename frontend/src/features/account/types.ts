export type MemberLibraryArticle = {
  id: string;
  title: string;
  excerpt: string;
  path: string | null;
  featuredImage?: string;
  bookmarkedAt?: string;
  upvotedAt?: string;
};
