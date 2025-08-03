import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
    hits: Movie[];
}

const KEY = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const config = {
        params: { query },
        headers: {
            Authorization: `Bearer ${KEY}`,
        },
    };
    const response = await axios.get<MoviesHttpResponse>("https://api.themoviedb.org/3/search/movie", config);
    return response.data.hits;
};


// https://api.themoviedb.org/3/search/movie
// https://hn.algolia.com/api/v1/search?query=${query}

