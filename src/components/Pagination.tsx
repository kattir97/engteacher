import { useEffect, useState } from "react";

import { $posts, $temp } from "../stores/blogstore";
import { useStore } from "@nanostores/react";
import "./css/pagination.css";
import "react-responsive-pagination/themes/classic.css";

function Pagination() {
  const posts = useStore($posts);
  console.log("rerendering");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const indexOfLastRecord = currentPage * postsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - postsPerPage;
  let data = posts.data;

  const currentPosts = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / postsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  useEffect(() => {
    $temp.setKey("data", currentPosts);
    data = $temp.value?.data ?? [];
  }, [$temp.value?.data]);

  const goToNextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
    $temp.setKey("data", currentPosts);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
    $temp.setKey("data", currentPosts);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a
            className="page-link"
            onClick={goToPrevPage} // Click event handler for navigating to previous page
          >
            Previous
          </a>
        </li>
        {/* Mapping through each page number */}
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber} className={`page-item ${currentPage == pgNumber ? "active" : ""} `}>
            <a
              onClick={() => setCurrentPage(pgNumber)} // Click event handler for setting the current page
              className="page-link"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            onClick={goToNextPage} // Click event handler for navigating to next page
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
