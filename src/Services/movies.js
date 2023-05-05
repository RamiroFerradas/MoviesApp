const VALID_CHARACTERS_REGEX = /^[a-zA-Z0-9\s]*$/;
import { APIKEY } from "@env";
export const searchAllMovies = async ({
  search = "",
  type = "",
  page = "",
}) => {
  type = type === "all" ? "" : type;

  if (!search || !VALID_CHARACTERS_REGEX.test(search)) {
    throw new Error("Invalid search input");
  }

  const url = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${search}&type=${type}&page=${page}`;

  try {
    const response = await Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
      ),
    ]);

    const json = await response.json();
    const movies = json.Search;

    if (!movies) {
      throw new Error("No movies found");
    }

    return {
      movies: movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        image: movie.Poster,
        year: movie.Year,
        type: movie.Type,
      })),
      totalResults: parseInt(json.totalResults),
    };
  } catch (error) {
    throw new Error(
      `No se encontraron películas para "${search}" de tipo "${type}".`
    );
  }
};
