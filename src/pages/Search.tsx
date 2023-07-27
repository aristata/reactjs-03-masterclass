import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import getSearchMulti from "../apis/getSearchMulti";
import { Search, SearchResult } from "../apis/types/Search";
import SearchSlider from "../components/SearchSlider";
import { makeImagePath } from "../utils/makeImagePath";
import SearchModal from "../components/SearchModal";

const Wrapper = styled.div`
  height: "500vh";
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bg_photo: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bg_photo});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const SliderArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 200px;
`;

export interface SelectedSearch extends Search {
  layoutId: string;
}

const SearchPage = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const [selectedSearch, setSelectedSearch] = useState<SelectedSearch | null>(
    null
  );

  const clickMovieHandler = (search: Search, layoutId: string) => {
    setSelectedSearch({ ...search, layoutId });
  };

  const closeModal = () => {
    setSelectedSearch(null);
  };

  const { data: searchResult, isLoading } = useQuery<SearchResult>(
    ["getSearch", "multi", keyword],
    () => getSearchMulti(keyword!!),
    {
      enabled: !!keyword
    }
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bg_photo={makeImagePath(
              searchResult?.results[0].backdrop_path || ""
            )}
          >
            <Title>{searchResult?.results[0].title}</Title>
            <Overview>{searchResult?.results[0].overview}</Overview>
          </Banner>
          <SliderArea>
            {searchResult && (
              <SearchSlider
                title="검색 결과"
                data={searchResult}
                clickedMovie={clickMovieHandler}
              />
            )}
          </SliderArea>

          {selectedSearch && (
            <SearchModal
              selectedSearch={selectedSearch}
              closeModal={closeModal}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default SearchPage;
