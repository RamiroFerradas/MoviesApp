import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import useNotifications from "../Hooks/useNotifications";

const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
  const { schedulePushNotification } = useNotifications({ sound: false });
  const [favourites, setFavourites] = useLocalStorage("favorites", []);

  const toggleFavourite = useCallback(
    async (movie) => {
      if (favourites.some((fav) => fav.id === movie.id)) {
        await setFavourites(favourites.filter((fav) => fav.id !== movie.id));
        schedulePushNotification({
          time: 10,
          title: "Peliculas Favoritas",
          body: `Sacaste ${movie.title} de tus favoritos`,
        });
      } else {
        await setFavourites([...favourites, movie]);
        schedulePushNotification({
          time: 10,
          title: "Peliculas Favoritas",
          body: `Agregaste ${movie.title} a tus favoritos`,
        });
      }
    },
    [favourites]
  );

  const data = useMemo(
    () => ({
      favourites,
      setFavourites,
      toggleFavourite,
      schedulePushNotification, // agrega la función al objeto data
    }),
    [favourites, schedulePushNotification, toggleFavourite]
  );

  return (
    <FavouritesContext.Provider value={data}>
      {children}
    </FavouritesContext.Provider>
  );
};

export { FavouritesProvider };

const useFavourites = () => {
  const {
    favourites,
    setFavourites,
    toggleFavourite,
    schedulePushNotification,
  } = useContext(FavouritesContext);

  return {
    favourites,
    setFavourites,
    toggleFavourite,
    schedulePushNotification,
  };
};

export default useFavourites;
