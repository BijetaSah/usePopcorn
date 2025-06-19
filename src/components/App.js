import { useCallback, useState } from "react";
import "../index.css";
import { SearchResult } from "./searchQuery.js";
import Box from "./box.js";
import Loader from "./loader.js";
import MovieDetails from "./movieDetails.js";
import MovieList from "./movieList.js";
import ErrorMessage from "./errorMessage.js";
import { WatchedSummary } from "./watchedSummary.js";
import { WatchedMovieLists } from "./watchedMovie.js";
import { useMovie } from "./useMovie.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);
  const { movies, isLoading, error } = useMovie(query, handleCloseMovie);

  function handleSelection(id) {
    setSelectedId((selected) => (id === selected ? null : id));
  }
  // function handleCloseMovie() {
  //   setSelectedId(null);
  // }

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
        <SearchResult
          query={query}
          setQuery={setQuery}
          handleCloseMovie={handleCloseMovie}
        />
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
