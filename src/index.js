import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./starRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        maxRating={10}
        color="purple"
        size={32}
        onSetRating={setMovieRating}
      />
      <p>This movie is {movieRating} rated</p>
    </div>
  );
}
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <StarRating
      maxRating={5}
      color="#fc4"
      size="24"
      className=""
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    {/* <StarRating maxRating={5} color="blue" size={48} /> */}
    <Test />
  </React.StrictMode>
);
