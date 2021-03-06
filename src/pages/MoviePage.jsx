import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Recommended from "../components/Recommended";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = React.useState([]);
  const [recommended, setRecommended] = React.useState([]);
  const navigate = useNavigate();

  function fetchMovieInfo() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b69c1933d70772560f256dfcc45c6056&language=en-US`
      )
      .then(({ data }) => {
        setMovie(data);
      });
  }

  function fetchRecommendedMovies() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=b69c1933d70772560f256dfcc45c6056&language=en-US`
      )
      .then(({ data }) => {
        setRecommended(data.results);
      });
  }

  React.useEffect(() => {
    fetchMovieInfo();
    fetchRecommendedMovies();
  }, [id] || []);

  return (
    <>
      <Nav />
      <section id="info">
        <div className="container">
          <div className="row">
            <IconButton onClick={() => navigate("/browse")}>
              <ArrowBackIcon fontSize="large" />
              <h2 className="purple">Back</h2>
            </IconButton>
            <div className="info--wrapper">
              <figure className="movie__poster">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  className="movie__poster--img"
                  alt=""
                />
              </figure>
              <div className="info__text">
                <h1 className="purple">{movie.title}</h1>
                <h3>
                  Release date:{" "}
                  <span className="purple">{movie.release_date}</span>
                </h3>
                <h2 className="purple">Summary</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {recommended.length !== 0 && (
        <Recommended recommendedMovies={recommended} />
      )}
    </>
  );
};

export default MoviePage;
