import { Button, HStack, Spinner, Text, View } from "native-base";
import useMovies from "../../../Context/MoviesContext";
import usePaginationMovies from "../../../Hooks/usePaginationMovies";

const PaginationComponent = () => {
  const { search, setMovies, filters, movies, totalResults } = useMovies();

  const {
    currentPage,
    handlePreviousPage,
    handleNextPage,
    setCurrentPage,
    totalPages,
    paginationButtons,
    isLoading,
  } = usePaginationMovies({
    search,
    setMovies,
    type: filters.type,
    filters,
    movies,
    totalResults,
  });

  return !isLoading ? (
    <View
      zIndex={999}
      top={20}
      flexDirection={"row"}
      position={"absolute"}
      opacity={0.8}
    >
      <Button
        height={8}
        backgroundColor="#fff"
        onPress={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <Text height={5}>{"<"}</Text>
      </Button>
      {paginationButtons.map((page, index) => {
        if (page === "...") {
          return (
            <View key={index} flexDirection="row" alignItems="center">
              <Text color="white" height={5} marginX={0.5}>
                {"..."}
              </Text>
            </View>
          );
        }
        return (
          <Button
            marginX={0.5}
            key={index}
            onPress={() => {
              setCurrentPage(page);
              setMovies([]);
            }}
            backgroundColor={currentPage === page ? "#8b8b8b" : "#fff"}
            height={8}
            textAlign={"center"}
            disabled={currentPage === page}
          >
            <Text height={5}>{page}</Text>
          </Button>
        );
      })}
      <Button
        height={8}
        backgroundColor="#fff"
        onPress={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <Text height={5}>{">"}</Text>
      </Button>
    </View>
  ) : (
    <View style={{ flex: 10, justifyContent: "center", alignItems: "center" }}>
      <Spinner size="lg" />
    </View>
  );
};

export default PaginationComponent;
