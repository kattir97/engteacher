import { $posts } from "../stores/blogstore";
import type { BlogPost } from "../utils/types";

function TagsFilter() {
  const tags = $posts.value?.data.map((post: BlogPost) => post.metadata.tags);
  console.log(tags);
  return <div>{}</div>;
}

export default TagsFilter;
