import { useState, useEffect } from "react";

import { useCallback } from "react";
import { searchAllMovies } from "../Services/movies";

const useFilterMovies = ({ search, movies, setMovies }) => {
  // const { movies, setMovies } = useFetchMovies({
  //   search,
  // });

  const [filters, setFilters] = useState({
    type: "all",
    orderAz: "all",
    orderYear: "all",
  });

  const [loadingFilters, setLoadingFilters] = useState(false);

  const filterMovies = useCallback(async () => {
    try {
      if (movies.length) {
        let filtered = [...movies];
        setLoadingFilters(true);

        if (filters.type !== "all") {
          const { movies } = await searchAllMovies({
            search,
            type: filters.type,
          });
          filtered = movies;
        }

        if (filters.orderAz !== "all") {
          filtered = filtered.sort((a, b) =>
            filters.orderAz === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title)
          );
        }

        if (filters.orderYear !== "all") {
          filtered = filtered.sort((a, b) =>
            filters.orderYear === "asc" ? a.year - b.year : b.year - a.year
          );
        }

        setMovies(filtered);
      }
    } catch (error) {
      console.error("error al filtrar peliculas", error);
    } finally {
      setLoadingFilters(false);
    }
  }, [movies, filters, search]);

  const handleFiltersChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    filterMovies();
  }, [filters.orderYear, filters.orderAz, filters.type]);

  return { filters, handleFiltersChange, loadingFilters, search };
};

export default useFilterMovies;
