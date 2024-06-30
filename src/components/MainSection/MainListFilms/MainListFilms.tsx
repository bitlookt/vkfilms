import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MainElementFilms from "../MainElementFilms/MainElementFilms";
import { FilmData } from "../MainSection";

export default function MainListFilms({
  films,
  handleAddToFavourite,
}: // isFavoriteFilm,
{
  films: FilmData[];
  handleAddToFavourite: (film: FilmData) => void;
  // isFavoriteFilm: (id: number) => boolean;
}) {
  return (
    <Grid2 spacing={"20px"} container>
      {films?.map((film) => (
        <Grid2 mt={"20px"} xs={6} sm={4} md={3} lg={2}>
          <MainElementFilms
            filmData={film}
            handleAddToFavourite={handleAddToFavourite}
            // isFavoriteFilm={isFavoriteFilm}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}
