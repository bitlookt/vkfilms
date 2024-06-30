import { Box, Pagination, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import MainListFilms from "./MainListFilms/MainListFilms";
import FilterFilms from "../FilterFilms/FilterFilms";
import { getFilms } from "../../API/dataFilms";
import { useDebounce } from "../../hooks/useDebounce";
import NoMoreRequestsBanner from "../NoMoreRequestsBanner/NoMoreRequestsBanner";

export interface FilmData {
  poster?: {
    url: string;
  };
  rating: {
    imdb: number;
  };
  genres: { name: string }[];
  name: string;
  alternativeName?: string;
  year: number;
  id: number;
}

export default function MainSection() {
  const [filmsData, setFilmsData] = useState<{
    docs: FilmData[];
    pages: number;
  }>({
    docs: [],
    pages: 0,
  });
  const [page, setPage] = useState(1);
  const [yearRange, setYearRange] = useState([1900, new Date().getFullYear()]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [favouriteFilms, setFavouriteFilms] = useState<FilmData[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [hasMoreRequests, setHasMoreRequests] = useState(true);
  const debouncedSearchText = useDebounce(searchText, 1500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const selectedGenresString = selectedGenres.join(",");
        const response = await getFilms(
          page,
          selectedGenresString,
          debouncedSearchText
        );
        setFilmsData({ docs: response.docs, pages: response.pages });
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setHasMoreRequests(false);
        }
      }
    };

    fetchFilms();
  }, [page, selectedGenres, debouncedSearchText]);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleGenreChange = (genre: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    }
  };

  const filteredFilms = filmsData.docs.filter(
    (film) =>
      film.year >= yearRange[0] &&
      film.year <= yearRange[1] &&
      film.rating.imdb >= ratingRange[0] &&
      film.rating.imdb <= ratingRange[1] &&
      (selectedGenres.length === 0 ||
        film.genres.some((g) => selectedGenres.includes(g.name))) &&
      film?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const limitedPages = Math.min(filmsData.pages, 30);

  useEffect(() => {
    const storedFavouriteFilms = JSON.parse(
      localStorage.getItem("favouriteFilms") || "[]"
    );
    setFavouriteFilms(storedFavouriteFilms);
  }, []);

  const handleAddToFavourite = (film: FilmData) => {
    if (!isFavoriteFilm(film.id)) {
      setFavouriteFilms([...favouriteFilms, film]);
      localStorage.setItem(
        "favouriteFilms",
        JSON.stringify([...favouriteFilms, film])
      );
    }
  };
  const isFavoriteFilm = (id: number) => {
    return favouriteFilms.some((film) => film.id === id);
  };

  return (
    <Stack direction="column" pt={5} pb={5} spacing={2}>
      <FilterFilms
        yearRange={yearRange}
        setYearRange={setYearRange}
        ratingRange={ratingRange}
        setRatingRange={setRatingRange}
        selectedGenres={selectedGenres}
        onGenreChange={handleGenreChange}
        handleSearchChange={handleSearchChange}
        searchText={searchText}
      />
      <Box display="flex" justifyContent="center">
        <Pagination
          count={limitedPages}
          onChange={handlePageChange}
          page={page}
        />
      </Box>
      {hasMoreRequests ? (
        <MainListFilms
          films={filteredFilms}
          handleAddToFavourite={handleAddToFavourite}
        />
      ) : (
        <NoMoreRequestsBanner />
      )}
      <Box display="flex" justifyContent="center">
        <Pagination
          count={limitedPages}
          onChange={handlePageChange}
          page={page}
        />
      </Box>
    </Stack>
  );
}
