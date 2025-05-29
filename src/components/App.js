import { useEffect, useState } from "react";
import "../index.css";
import { KEY } from "./utility.js";
import { SearchResult } from "./searchQuery.js";
import Box from "./box.js";
import Loader from "./loader.js";
import MovieDetails from "./movieDetails.js";
import MovieList from "./movieList.js";
import ErrorMessage from "./errorMessage.js";
import { WatchedSummary } from "./watchedSummary.js";
import { WatchedMovieLists } from "./watchedMovie.js";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("🛑 Something went wrong while fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (!query) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  function handleSelection(id) {
    setSelectedId((selected) => (id === selected ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleWatchedAdd(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleWatchedDelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }
  return (
    <>
      <Navbar>
        <Logo />
        <SearchResult query={query} setQuery={setQuery} />
        <NumberOfResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectionMovie={handleSelection} />
          )}
          {error && <ErrorMessage errMsg={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onWatchedAdd={handleWatchedAdd}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieLists
                watched={watched}
                onWatchedDelete={handleWatchedDelete}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumberOfResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
