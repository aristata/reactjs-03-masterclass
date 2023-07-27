import { TMDB_API_TOKEN, TMDB_URI } from "./commonKeys";

export default function getSearchMulti(keyword: string) {
  return fetch(`${TMDB_URI}/search/multi?language=ko-kr&query=${keyword}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TMDB_API_TOKEN}`
    }
  }).then((response) => response.json());
}
