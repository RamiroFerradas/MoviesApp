import { createContext, useContext, useMemo, useState } from "react";

import useSearch from "../Hooks/useSearch";
import useFetchMovies from "../Hooks/useFetchMovies";
import { useEffect } from "react";
import { filterByType } from "../Services/movies";
import useFilterMovies from "../Hooks/useFilterMovies";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const { search, updateSearch } = useSearch();
  const { movies, getMovies, loading, error, setMovies, totalResults } =
    useFetchMovies({
      search,
    });

  const { loadingFilters, filters, handleFiltersChange } = useFilterMovies({
    search,
    movies,
    setMovies,
  });

  const data = useMemo(
    () => ({
      movies,
      getMovies,
      loading,
      error,
      search,
      updateSearch,
      handleFiltersChange,
      filters,
      loadingFilters,
      setMovies,
      totalResults,
    }),
    [
      movies,
      getMovies,
      loading,
      search,
      error,
      updateSearch,
      filters,
      loadingFilters,
      setMovies,
      totalResults,
    ]
  );

  return (
    <MoviesContext.Provider value={data}>{children}</MoviesContext.Provider>
  );
};

export { MoviesProvider };

const useMovies = () => {
  const {
    movies,
    getMovies,
    loading,
    error,
    search,
    updateSearch,
    filters,
    handleFiltersChange,
    loadingFilters,
    setMovies,
    totalResults,
  } = useContext(MoviesContext);
  return {
    movies,
    getMovies,
    loading,
    error,
    search,
    updateSearch,
    filters,
    handleFiltersChange,
    loadingFilters,
    totalResults,
    setMovies,
  };
};

export default useMovies;
