import { TMDB_API_TOKEN, TMDB_URI } from "./commonKeys";

export default function getMoviesNowPlaying() {
  return fetch(`${TMDB_URI}/movie/now_playing?language=ko-kr`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TMDB_API_TOKEN}`
    }
  }).then((response) => response.json());
}
