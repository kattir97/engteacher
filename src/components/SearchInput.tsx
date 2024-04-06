import { useEffect, type ChangeEvent, useState } from "react";

import { $isModalOpen, $loading, $posts, $searchQuery, $temp } from "../stores/blogstore";
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

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    $isModalOpen.set(true);
    console.log($isModalOpen.value);
  };

  // const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
  //   const query: string = event.target.value.toLowerCase();
  //   setValue(query);
  //   $searchQuery.set(query);

  //   // if ($temp.value?.data) {
  //   //   const filtered = arr.filter((post: BlogPost) => {
  //   //     return post.title.toLowerCase().includes($searchQuery.get());
  //   //   });

  //   //   $temp.setKey("data", filtered);
  //   // }
  // };

  // const handleSearch = (e: KeyboardEvent) => {
  //   if ($temp.value?.data && e.key === "Enter") {
  //     const filtered = arr.filter((post: BlogPost) => {
  //       return post.title.toLowerCase().includes($searchQuery.get());
  //     });

  //     $temp.setKey("data", filtered);
  //     setValue("");
  //     $searchQuery.set("");
  //   }
  // };

  const handleInput = () => {
    setValue("");
  };

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Искать..."
      value={value}
      onChange={handleInput}
      // onKeyDown={(e) => handleSearch(e)}
      onClick={openModal}
    />
  );
}

export default SearchInput;
