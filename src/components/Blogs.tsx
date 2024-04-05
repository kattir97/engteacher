import { $loading, $temp } from "../stores/blogstore";
import { useStore } from "@nanostores/react";
import { BlogCard } from "./BlogCard";
import type { BlogPost } from "../utils/types";

export function Blogs() {
  const posts = useStore($temp);

  const spinner = <h1 className="heading-lg">"Loading..."</h1>;
  const empty = <h1 className="heading-lg">No blogposts were found!</h1>;

  if ($loading.value) {
    return spinner;
  }

  const filtered = posts.data.map((post: BlogPost) => (
    <BlogCard
      key={post.slug}
      title={post.title}
      excerpt={post.metadata.excerpt}
      date={post.created_at}
      imageUrl={`url(${post.metadata.image.url})`}
      tags={post.metadata.tags}
      slug={post.slug}
    />
  ));

  return <>{filtered.length > 0 ? filtered : empty}</>;
}
