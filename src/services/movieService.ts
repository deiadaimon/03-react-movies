import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
    results: Movie[];
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
    return response.data.results;
};
