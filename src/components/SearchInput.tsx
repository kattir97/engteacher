import { useEffect, type ChangeEvent, useState } from "react";

import { $loading, $posts, $searchQuery, $temp } from "../stores/blogstore";
import pkg from "lodash";
const { debounce } = pkg;
import { type BlogPost } from "../utils/types";
import { getAllPosts } from "../lib/consmic";
import "./css/search-input.css";

export function SearchInput() {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<BlogPost[]>([]);

  const fetchData = async () => {
    $loading.set(true);
    const items: BlogPost[] = await getAllPosts();
    $posts.setKey("data", items);
    setArr(items);
    $temp.setKey("data", items);
    $loading.set(false);
  };

  console.log("rerendered");
  useEffect(() => {
    fetchData();
  }, []);

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query: string = event.target.value.toLowerCase();
    setValue(query);
    $searchQuery.set(query);

    if ($temp.value?.data) {
      const filtered = arr.filter((post: BlogPost) => {
        return post.title.toLowerCase().includes($searchQuery.get());
      });

      $temp.setKey("data", filtered);
    }
  };

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Искать..."
      value={value}
      onChange={(e) => handleQuery(e)}
    />
  );
}

export default SearchInput;
