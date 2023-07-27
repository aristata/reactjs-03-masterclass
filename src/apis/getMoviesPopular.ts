// const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;
const TMDB_URI = process.env.REACT_APP_TMDB_URI;

export default function getMoviesPopular() {
  return fetch(`${TMDB_URI}/movie/popular?language=ko-kr`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TMDB_API_TOKEN}`
    }
  }).then((response) => response.json());
}
