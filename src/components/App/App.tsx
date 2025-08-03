import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSearch = async (query: string) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const data = await fetchMovies(query);
            if (data.length === 0) {
                toast.error("No movies found for your request.");
            }
            setMovies(data);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.app}>
            <Toaster />
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movies.length > 0 && <MovieGrid movies={movies} />}
        </div>
    );
}
