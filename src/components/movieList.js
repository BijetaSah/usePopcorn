export default function MovieList({ movies, onSelectionMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movies
          key={movie.imdbID}
          movie={movie}
          onSelectionMovie={onSelectionMovie}
        />
      ))}
    </ul>
  );
}
function Movies({ movie, onSelectionMovie }) {
  return (
    <li onClick={() => onSelectionMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
