export interface BlogPost {
  slug: string;
  title: string;
  created_at: string;
  metadata: {
    content: string;
    description: string;
    post: string;
    image: {
      url: string;
    };
    excerpt: string;
    tags: {
      title: string;
    }[];
  };
}