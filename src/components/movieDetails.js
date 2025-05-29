import { useState, useEffect } from "react";
import StarRating from "../starRating";
import Loader from "./loader";
import "../index.css";
import { KEY } from "./utility";
export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onWatchedAdd,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const {
    Title: title,
    Actors: actor,
    Released: released,
    Runtime: runtime,
    imdbRating: rating,
    Poster: poster,
    Genre: genre,
    Director: director,
    Plot: plot,
  } = movie;

  function handleWatchedMovie() {
    const newWatchedMovie = {
      imdbId: selectedId,
      poster,
      rating: Number(rating),
      title,
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };
    onWatchedAdd(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = `usePopcorn`;
      };
    },
    [title]
  );
  useEffect(
    function () {
      function callback(e) {
        if (e.key === "Escape") onCloseMovie();
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐ {rating}</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleWatchedMovie}>
                      Add to watch list
                    </button>
                  )}
                </>
              ) : (
                <p>You have alrady rated this movie {watchedUserRating}</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actor}</p>
            <p> Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
