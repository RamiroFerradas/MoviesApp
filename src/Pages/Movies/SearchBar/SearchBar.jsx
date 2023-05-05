import { VStack, Input, Button, Icon, Box, Divider, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import useSearch from "../../../Hooks/useSearch";
import { Keyboard } from "react-native";
import useMovies from "../../../Context/MoviesContext";

export default function SearchBar({ setViewFilters, viewFilters }) {
  const { error, setError } = useSearch();
  const { getMovies, search, updateSearch } = useMovies();

  const handleSubmit = () => {
    getMovies();
    setViewFilters(false);
    Keyboard.dismiss();
    setError(search === "" ? "No se puede encontrar una pelicula vacia" : "");
  };

  const handleInputChangue = (text) => {
    if (text) {
      setError("");
    }
    updateSearch(text);
  };

  return (
    <Box alignItems="center" justifyContent="center">
      <VStack
        paddingY={5}
        space={5}
        // w="80%"
        maxW="230px"
        divider={
          <Box px="2">
            <Divider />
          </Box>
        }
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
      >
        <Button
          background={"#73aef7"}
          onPress={() => setViewFilters(!viewFilters)}
        >
          <Ionicons name="filter" size={24} color="black" />
        </Button>
        <Input
          value={search}
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          name="query"
          color={"#b0b0b0"}
          error={!!error}
          _focus={error ? { borderColor: "red.500", borderWidth: 1.5 } : {}}
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />
          }
          onChangeText={handleInputChangue}
        />
        <Button
          color={"black"}
          background={"#73aef7"}
          type="submit"
          onPress={handleSubmit}
        >
          <Text color={"black"}>Buscar</Text>
        </Button>
      </VStack>
      {!viewFilters && (
        <Box
          padding={1}
          position={"relative"}
          alignItems={"center"}
          justifyContent={"center"}
          width={1000}
        >
          {error && (
            <Text position={"absolute"} color={"#b60000"}>
              {error}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
