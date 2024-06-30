import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import noImage from "C:/Users/Артём/Desktop/VK_films/VK_films/src/image/pya5k5qetqhcd2lm4finiaulj4hjv7pq.jpg";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { FilmData } from "../MainSection";
import { useState } from "react";
export default function MainElementFilms({
  filmData,
  handleAddToFavourite,
  isFavoriteFilm,
}: // isFavoriteFilm,
{
  filmData: FilmData;
  handleAddToFavourite: (film: FilmData) => void;
  isFavoriteFilm: (id: number) => boolean;
}) {
  console.log({ filmData });
  const backgroundImage = filmData.poster
    ? `url(${filmData.poster.url})`
    : `url(${noImage})`;

  const [iconColor, setIconColor] = useState("inherit");

  const handleFavoriteClick = () => {
    handleAddToFavourite(filmData);
    setIconColor((prevColor) =>
      prevColor === "inherit" ? "secondary" : "inherit"
    );
  };

  return (
    <Stack direction="column" spacing={"8px"}>
      <Link to={`/films/${filmData.id}`}>
        <Box
          sx={{
            backgroundImage: backgroundImage,
            width: "100%",
            height: { xs: "260px", md: "400px", lg: "260px" },
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: "10px",
            position: "relative",
            border: filmData.poster ? "none" : "1px solid #000000",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#3BB77E",
              padding: "2px 5px",
              borderRadius: "5px",
              position: "absolute",
              left: "5px",
              top: "5px",
            }}
          >
            <Typography sx={{ color: "white", fontSize: "14px" }}>
              {filmData.rating.imdb}
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Typography variant="body1" color="white">
              Узнать больше
            </Typography>
          </Box>
        </Box>
      </Link>
      <Typography
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {filmData.name || filmData.alternativeName}
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: "5px" }}>
        <Typography>{filmData.year}</Typography>
        <Box
          sx={{
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <BookmarkAddIcon color={iconColor} onClick={handleFavoriteClick} />
        </Box>
      </Stack>
    </Stack>
  );
}
