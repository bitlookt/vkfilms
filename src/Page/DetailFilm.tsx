import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFilmById } from "../API/dataFilms";
import { filmData } from "../API/dataFilms";

export default function DetailFilm() {
  const { id = "" } = useParams<{ id: string }>();
  const [film, setFilm] = useState<filmData | null>(null);

  useEffect(() => {
    console.log("useEffect called with id:", id);
    const fetchFilm = async () => {
      try {
        const data = await getFilmById(id);
        setFilm(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilm();
  }, [id]);

  if (!film) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box mt={5}>
      <Link to="/">
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Назад
        </Button>
      </Link>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <img
              src={film.poster?.url}
              alt={film.name}
              width="100%"
              height="auto"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Box>
            <Typography variant="h4">{film.name}</Typography>
            <Typography variant="subtitle1">
              {film.year} • {film.genres?.map((genre) => genre.name).join(", ")}
            </Typography>
            <Typography variant="body1" paragraph>
              {film.description}
            </Typography>
            <Typography variant="h6">Рейтинг: {film.rating?.imdb}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
