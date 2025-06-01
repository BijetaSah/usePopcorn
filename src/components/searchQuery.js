import "../index.css";
import { useEffect, useRef } from "react";
export function SearchResult({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(
    function () {
      inputEl.current.focus();

      const callback = function (e) {
        if (e.key === "Enter") setQuery("");
      };
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [inputEl, setQuery]
  );
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
