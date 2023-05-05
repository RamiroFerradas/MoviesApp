import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { searchAllMovies } from "../Services/movies";
import useMovies from "../Context/MoviesContext";

export default function usePaginationMovies({
  search = "",
  setMovies,
  type,
  filters,
  movies,
  totalResults,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    if (!search) {
      return;
    }
    try {
      setIsLoading(true);
      const { movies } = await searchAllMovies({
        search,
        page: currentPage,
        type,
      });

      const pages = Math.floor(totalResults / 10);

      setMovies(movies);
    } catch (error) {
      console.error(error, "error en paginado");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePreviousPage = () => {
    setMovies([]);
    setCurrentPage(currentPage - 1);
    setIsLoading(true);
  };

  const handleNextPage = () => {
    setMovies([]);
    setCurrentPage(currentPage + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage, filters]);

  const totalPages =
    Math.floor(totalResults / 10) <= 0 ? 1 : Math.floor(totalResults / 10);

  const paginationButtons = [];
  const maxButtons = 5;

  if (totalPages <= maxButtons) {
    // Show all buttons if totalPages <= maxButtons
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(i);
    }
  } else if (currentPage <= 2) {
    // Show first maxButtons buttons if currentPage <= 2
    for (let i = 1; i <= maxButtons; i++) {
      paginationButtons.push(i);
    }
    paginationButtons.push("...");
    paginationButtons.push(totalPages);
  } else if (currentPage >= totalPages - 1) {
    // Show last maxButtons buttons if currentPage >= totalPages - 1
    paginationButtons.push(1);
    paginationButtons.push("...");
    for (let i = totalPages - maxButtons + 1; i <= totalPages; i++) {
      paginationButtons.push(i);
    }
  } else {
    // Show buttons around the current page
    paginationButtons.push(1);
    paginationButtons.push("...");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      paginationButtons.push(i);
    }
    paginationButtons.push("...");
    paginationButtons.push(totalPages);
  }

  return {
    totalPages,
    paginationButtons,
    currentPage,
    isLoading,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
  };
}
