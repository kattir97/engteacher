import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { $isModalOpen, $posts, $searchQuery } from "../stores/blogstore";
import { useStore } from "@nanostores/react";
import article from "../icons/article.svg";

interface ModalProps {
  isOpen?: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
import "./css/modal-search.css";

import type { BlogPost } from "../utils/types";

const SearchModal: React.FC<ModalProps> = () => {
  const isOpen = useStore($isModalOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<BlogPost[]>([]);
  const dialogWindowRef = useRef<HTMLDivElement | null>(null);

  const handleClose = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (dialogWindowRef.current && !dialogWindowRef.current.contains(event.target as Node)) {
      $isModalOpen.set(false);
    }
  };

  const handleEsc = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      $isModalOpen.set(false);
    }
  };

  useEffect(() => {
    setArr($posts.get().data);
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
        setValue("");
      }
    }
  }, [isOpen]);

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query: string = event.target.value.toLowerCase();
    setValue(query);
    $searchQuery.set(query);

    if ($posts.value?.data) {
      const filtered = [...$posts.get().data].filter((post: BlogPost) => {
        return post.title.toLowerCase().includes($searchQuery.get());
      });

      // $temp.setKey("data", filtered);
      setArr(filtered);
    }
  };

  return (
    <dialog
      ref={modalRef}
      className="modal"
      onClick={(e) => handleClose(e)}
      onKeyDown={(e) => handleEsc(e)}
    >
      <div className="dialog-window" ref={dialogWindowRef}>
        <input type="text" className="modal-input" value={value} onChange={(e) => handleQuery(e)} />
        <div className="hz-container">
          {arr.map((post: BlogPost, idx) => {
            return (
              <div className="hz-card" key={idx}>
                <img src={article.src} alt="" className="hz-img" />
                <div className="hz-content">
                  <a href={`/blog/${post.slug}`} className="hz-link">
                    <h1 className="hz-title">{post.title}</h1>
                  </a>

                  <p className="hz-paragraph">{`${post.metadata.excerpt.slice(0, 200)}...`}</p>
                  <h4 className="hz-date">{new Date(post.created_at).toLocaleDateString()}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
