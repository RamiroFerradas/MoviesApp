import { View, Box, Text, Button, Select } from "native-base";
import SearchBar from "../SearchBar/SearchBar";
import Movies from "./Movies";
import useSearch from "../../../Hooks/useSearch";
import useFetchMovies from "../../../Hooks/useFetchMovies";
import useMovies from "../../../Context/MoviesContext";
import { useEffect, useState } from "react";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Filters from "../Filters/Filters";
// import { Animated } from "react-native";
import * as Animatable from "react-native-animatable";
import PaginationComponent from "../Paginated/Paginated";
export default function RenderMovies() {
  const [viewFilters, setViewFilters] = useState(false);

  const { movies } = useMovies();

  return (
    <View flex={5} alignItems={"center"}>
      <Box style={{ zIndex: 99 }} position="relative">
        <SearchBar setViewFilters={setViewFilters} viewFilters={viewFilters} />
      </Box>
      {viewFilters && (
        <Animatable.View
          style={{ top: 80, zIndex: 90 }}
          position="absolute"
          duration={300}
          animation={"fadeInDown"}
        >
          <Filters />
        </Animatable.View>
      )}

      <Box
        // maxHeight="400"
        style={{ zIndex: 1 }}
        position={"relative"}
        flex={1}
        width="98%"
        alignItems={"center"}
      >
        <Movies movies={movies} />
      </Box>
      <PaginationComponent />
    </View>
  );
}
