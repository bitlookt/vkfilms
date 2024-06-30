import axios from "axios";

const BASE_URL = import.meta.env.VITE_FILMS_API_URL;
const API_KEY = import.meta.env.VITE_FILMS_API_KEY;

interface FilmResponse {
  docs: Film[];
  pages: number;
}

interface Film {
  id: number;
  name: string;
  alternativeName?: string;
  year: number;
  rating: {
    imdb: number;
  };
  poster?: {
    url: string;
  };
  genres: { name: string }[];
}

export const getFilms = async (
  page: number,
  genres: string,
  search?: string
  // startYear: number,
  // endYear: number
): Promise<FilmResponse> => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        "X-API-KEY": API_KEY,
      },
      params: {
        limit: 50,
        page,
        genres: genres.split(","),
        search,
      },
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFilmById = async (id: string): Promise<Film> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGenres = async (): Promise<string[]> => {
  try {
    const response = await axios.get(
      `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name`,
      {
        headers: {
          "X-API-KEY": API_KEY,
        },
      }
    );
    return response.data.map((genre: { name: string }) => genre.name);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
