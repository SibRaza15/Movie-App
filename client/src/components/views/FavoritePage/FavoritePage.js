import React, { useState, useEffect } from "react";
import "./FavoritePage.css";
import axios from "axios";
import { Popover } from "antd";
import { IMAGE_URL } from "../../Config";

export default function FavoritePage() {
  const [FavoritedMovies, setFavoritedMovies] = useState([]);

  const variable = {
    userFrom: localStorage.getItem("userId"),
  };

  useEffect(() => {
    fetchFavoritedMovies();
  }, []);

  const fetchFavoritedMovies = () => {
    axios.post("/api/favorite/getFavoritedMovie", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.favorites);
        setFavoritedMovies(response.data.favorites);
      } else {
        alert("Failed to get subscription videos");
      }
    });
  };

  const onClickRemove = (movieId) => {
    const variables = {
      userFrom: localStorage.getItem("userId"),
      movieId: movieId,
    };

    axios
      .post("/api/favorite/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoritedMovies();
        } else {
          alert("Failed to Remove From Favorite");
        }
      });
  };

  const renderTableBody = FavoritedMovies.map((movie, index) => {
    const content = (
      <div>
        {movie.moviePost ? (
          <img src={`${IMAGE_URL}w500${movie.moviePost}`} alt="moviePost" />
        ) : (
          "No image"
        )}
      </div>
    );
    return (
      <tr>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime}</td>
        <td>
          <button onClick={() => onClickRemove(movie.movieId)}>
            Remove from favorites
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h3>Favorite Movies For Me: </h3>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove From Favorites</th>
          </tr>
        </thead>
        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
}
