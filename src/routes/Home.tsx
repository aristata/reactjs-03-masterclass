import { useQuery } from "@tanstack/react-query";
import getMoviesNowPlaying from "../apis/getMoviesNowPlaying";

const Home = () => {
  const { data, isLoading } = useQuery(
    ["getMovies", "nowPlaying"],
    getMoviesNowPlaying
  );
  console.log("data", data);
  return (
    <div style={{ height: "500vh" }}>
      <p>Home</p>
    </div>
  );
};

export default Home;
