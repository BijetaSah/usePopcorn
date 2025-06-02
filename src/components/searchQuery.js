import "../index.css";
import { useEffect, useRef } from "react";
import { useKeyEvent } from "./useKeyEvent";
export function SearchResult({ query, setQuery, handleCloseMovie }) {
  const inputEl = useRef(null);

  // focusing on input on Enter
  useKeyEvent("Enter", function () {
    inputEl.current.focus();
    setQuery("");
    handleCloseMovie();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
