import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";

import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";

import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { SMALL_IMG_COVER_BASE_URL } from "./config";

import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

//TVShowAPI.fetchRecommendations(44217);

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setrecommendationList] = useState([]);

  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();
      if (populars.length > 0) {
        setCurrentTVShow(populars[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche des series populaires" + error.message);
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
      if (recommendations.length > 0) {
        setrecommendationList(recommendations);
      }
    } catch (error) {
      alert(
        "Erreur durant la recherche des series recommendées" + error.message
      );
    }
  }

  //
  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  //
  function setCurrentTVShowFromRecommendation(tvShow) {
    alert(JSON.stringify(tvShow));
  }

  console.log("***", recommendationList);

  async function searchTVShow(tvShowName) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche de la serie.  " + error.message);
    }
  }
  //
  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title="Watowatch"
              subtitle="Find a show you may like"
            />
          </div>

          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={searchTVShow}></SearchBar>
          </div>
        </div>
      </div>

      <div className={s.tv_show_detail}>
        {currentTVShow && (
          <TVShowDetail TVShowDetail tvShow={currentTVShow}></TVShowDetail>
        )}
      </div>
      <div className={s.recommendations}>
        {currentTVShow && recommendationList.length > 0 && (
          <TVShowList
            onClickItem={setCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
