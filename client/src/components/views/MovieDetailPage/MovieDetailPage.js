import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import GridCard from "../LandingPage/Sections/GridCard";
import { Descriptions, Button, Row } from "antd";
import Favorite from "./Sections/Favorite";
import Comments from "../Comments/Comments";
import axios from "axios";

export default function MovieDetailPage(props) {
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  const [CommentLists, setCommentLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const movieId = props.match.params.movieid;

  const movieVariable = {
    postId: movieId,
  };

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);
      });

    fetch(
      `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.cast);
        setCrews(response.cast);
      });

    axios.post("/api/comments/getComments", movieVariable).then((response) => {
      if (response.data.success) {
        console.log("response.data.comments", response.data.comments);
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get comments");
      }
    });
  }, []);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  return (
    <div>
      <MainImage
        image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/*Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            userFrom={localStorage.getItem("userId")}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>

        <Descriptions title="Movie Info" bordered>
          <Descriptions.Item label="Title">
            {Movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="release_date">
            {Movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
          <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
          <Descriptions.Item label="vote_average" span={2}>
            {Movie.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label="vote_count">
            {Movie.vote_count}
          </Descriptions.Item>
          <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
          <Descriptions.Item label="popularity">
            {Movie.popularity}
          </Descriptions.Item>
        </Descriptions>

        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}>Toggle Actor View</Button>
        </div>
        <br />
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Crews &&
              Crews.map((crew, index) => (
                <React.Fragment key={index}>
                  {crew.profile_path && (
                    <GridCard
                      actor
                      image={`${IMAGE_URL}w500${crew.profile_path}`}
                      character={crew.character}
                      name={crew.name}
                    />
                  )}
                </React.Fragment>
              ))}
          </Row>
        )}

        <Comments
          CommentLists={CommentLists}
          postId={movieId}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}
