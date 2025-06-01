import { useEffect } from "react";
export function WatchedMovieLists({ watched, onWatchedDelete }) {
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.title}
          onWatchedDelete={onWatchedDelete}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onWatchedDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.rating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onWatchedDelete(movie.imdbId)}
      >
        &times;
      </button>
    </li>
  );
}
