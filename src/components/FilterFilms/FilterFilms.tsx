import { Box, Stack, Typography } from "@mui/material";
import GenreFilms from "./FilterElements/GenreFilms";
import YearFilms from "./FilterElements/YearFilms";
import RatingFilms from "./FilterElements/RatingFilms";
import SearchFilms from "./FilterElements/SearchFilms";

export default function FilterFilms({
  setYearRange,
  yearRange,
  setRatingRange,
  ratingRange,
  selectedGenres,
  onGenreChange,
  handleSearchChange,
  searchText,
}) {
  return (
    <Stack direction={"column"} spacing={2}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={"space-between"}
        spacing={2}
      >
        <Box alignItems={"center"} display={"flex"}>
          <SearchFilms
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </Box>
        <Box width={{ xs: "300px", sm: "350px", md: "380px" }}>
          <Typography variant="h6">Год выпуска</Typography>
          <YearFilms setYearRange={setYearRange} yearRange={yearRange} />
        </Box>
        <Box width={{ xs: "300px", sm: "350px", md: "380px" }}>
          <Typography variant="h6">Рейтинг</Typography>
          <RatingFilms
            setRatingRange={setRatingRange}
            ratingRange={ratingRange}
          />
        </Box>
      </Stack>

      <Box sx={{ width: "200px" }}>
        <GenreFilms
          selectedGenres={selectedGenres}
          onGenreChange={onGenreChange}
        />
      </Box>
    </Stack>
  );
}
