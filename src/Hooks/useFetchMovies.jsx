import { useState } from "react";
import { searchAllMovies } from "../Services/movies";
import { useRef } from "react";
export default function useFetchMovies({ search }) {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const previusSearch = useRef(search);

  const getMovies = async () => {
    // if (search === previusSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const { movies, totalResults } = await searchAllMovies({ search });
      setMovies(movies);
      setTotalResults(totalResults);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { movies, getMovies, loading, error, setMovies, totalResults };
}
