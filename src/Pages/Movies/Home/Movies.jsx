import { Box, Button, FlatList, Icon, Image, Text } from "native-base";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useMemo } from "react";
import useFavourites from "../../../Context/FavouritesContext";
import * as Animatable from "react-native-animatable";
import useMovies from "../../../Context/MoviesContext";
import PaginationComponent from "../Paginated/Paginated";
import usePaginationMovies from "../../../Hooks/usePaginationMovies";

export default function Movies({ movies }) {
  const { favourites, toggleFavourite } = useFavourites();

  const { loading, loadingFilters } = useMovies();
  const memoizedMovies = useMemo(() => movies, [movies]);
  const defaultImageSource = require("../../../Assets/Images/image-error.jpg");

  const hasMovies = movies?.length > 0;
  return (
    <>
      {loading || loadingFilters ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text color={"white"}>Cargando...</Text>
        </Box>
      ) : hasMovies ? (
        <SafeAreaView>
          <Animatable.View animation="zoomIn">
            <FlatList
              extraData={movies}
              data={memoizedMovies}
              keyExtractor={(movie) => movie.id}
              renderItem={({ item: movie }) => (
                <Box alignItems={"center"} paddingBottom={8}>
                  <Text
                    textTransform={"uppercase"}
                    fontSize={20}
                    color={"white"}
                    textAlign={"center"}
                  >
                    {movie.title}
                  </Text>
                  <Text color={"white"}> {movie.year}</Text>
                  <Box position="relative">
                    <Box position="absolute" top={3} right={2} zIndex={10}>
                      <Button
                        opacity={0.9}
                        backgroundColor={"#73aef7"}
                        onPress={() => toggleFavourite(movie)}
                      >
                        <Icon
                          as={<AntDesign name="star" size={50} />}
                          color={
                            favourites.some((fav) => fav.id === movie.id)
                              ? "#fbff00"
                              : "#fff"
                          }
                          size="md"
                        />
                      </Button>
                    </Box>

                    <Image
                      source={{ uri: movie.image }}
                      alt={movie.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImageSource;
                      }}
                      style={{
                        width: "100%",
                        aspectRatio: 2 / 2,
                        borderWidth: 1,
                        borderColor: "black",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                  <Text color={"white"}>Type: {movie.type}</Text>
                </Box>
              )}
            />
          </Animatable.View>
        </SafeAreaView>
      ) : (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text color={"white"}>No se encontraron películas</Text>
        </Box>
      )}
    </>
  );
}
