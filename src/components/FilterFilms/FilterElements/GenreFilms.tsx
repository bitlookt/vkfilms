import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getGenres } from "../../../API/dataFilms";

export default function GenresFilms({ selectedGenres, onGenreChange }) {
  const [open, setOpen] = useState(false);
  const [genresList, setGenresList] = useState<string[]>([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleGenreChange =
    (genre: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isSelected = event.target.checked;
      onGenreChange(genre, isSelected);
    };

  const fetchGenres = async () => {
    try {
      const genres = await getGenres();
      setGenresList(genres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <Button
        startIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        onClick={handleToggle}
      >
        Жанры
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",

            height: "300px",
          }}
        >
          {genresList.map((genre) => (
            <Box key={genre} sx={{ width: "100%", flex: "1 0 auto" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedGenres.includes(genre)}
                    onChange={handleGenreChange(genre)}
                  />
                }
                label={
                  <Typography textTransform="capitalize">{genre}</Typography>
                }
              />
            </Box>
          ))}
        </Box>
      </Collapse>
    </>
  );
}
