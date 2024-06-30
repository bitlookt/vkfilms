import React, { useEffect, useState } from "react";

import MainElementFilms from "../components/MainSection/MainElementFilms/MainElementFilms";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FilmData } from "../components/MainSection/MainSection";
export default function FavouritesFilms() {
  const [favouriteFilms, setFavouriteFilms] = useState<FilmData[]>([]);

  useEffect(() => {
    const storedFavouriteFilms = localStorage.getItem("favouriteFilms");
    if (storedFavouriteFilms) {
      setFavouriteFilms(JSON.parse(storedFavouriteFilms));
    }
  }, []);

  return (
    <Grid2 mt={"20px"} container spacing={"20px"}>
      {favouriteFilms.map((film) => (
        <Grid2 xs={6} sm={4} md={3} lg={2} key={film.id}>
          <MainElementFilms filmData={film} />
        </Grid2>
      ))}
    </Grid2>
  );
}
