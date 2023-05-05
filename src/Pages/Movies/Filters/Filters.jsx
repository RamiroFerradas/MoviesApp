import { Box, Center, CheckIcon, Select, Text, View } from "native-base";
import { useState } from "react";
import useMovies from "../../../Context/MoviesContext";

export default function Filters() {
  const { handleFiltersChange, filters } = useMovies();

  const optionsType = [
    { label: "Todos", value: "all" },
    { label: "Película", value: "movie" },
    { label: "Serie", value: "series" },
    { label: "Juego", value: "game" },
  ];
  const optionsAz = [
    { label: "Todos", value: "all" },
    { label: "A-Z", value: "az" },
    { label: "Z-A", value: "za" },
  ];
  const optionsYears = [
    { label: "Todos", value: "all" },
    { label: "Mayor año", value: "asc" },
    { label: "Menor año", value: "dsc" },
  ];

  return (
    <Center
      backgroundColor={"#242323"}
      flexDirection={"row"}
      justifyContent={"space-around"}
      maxW={1000}
      paddingY={1}
      borderRadius={10}
    >
      <Box>
        <Text textAlign={"center"} color={"white"}>
          Tipo
        </Text>
        <Select
          marginX={3}
          selectedValue={filters?.type}
          minWidth="100"
          accessibilityLabel="Tipo"
          placeholder="Tipo"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          color={"white"}
          textAlign={"center"}
          mt={1}
          onValueChange={(itemValue) => handleFiltersChange("type", itemValue)}
        >
          {optionsType.map(({ label, value }, i) => (
            <Select.Item
              textAlign={"center"}
              label={label}
              value={value}
              key={i}
            />
          ))}
        </Select>
      </Box>
      <Box maxW="300">
        <Text textAlign={"center"} color={"white"}>
          Orden alfabetico
        </Text>
        <Select
          marginX={3}
          selectedValue={filters?.orderAz}
          minWidth="100"
          accessibilityLabel="A-Z"
          placeholder="A-Z"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          color={"white"}
          textAlign={"center"}
          mt={1}
          onValueChange={(itemValue) =>
            handleFiltersChange("orderAz", itemValue)
          }
        >
          {optionsAz.map(({ label, value }, i) => (
            <Select.Item
              textAlign={"center"}
              label={label}
              value={value}
              key={i}
            />
          ))}
        </Select>
      </Box>
      <Box maxW="300">
        <Text textAlign={"center"} color={"white"}>
          Orden por año
        </Text>
        <Select
          marginX={3}
          selectedValue={filters?.orderYear}
          minWidth="100"
          accessibilityLabel="Orden cronologico"
          placeholder="Orden cronologico"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          color={"white"}
          textAlign={"center"}
          mt={1}
          onValueChange={(itemValue) =>
            handleFiltersChange("orderYear", itemValue)
          }
        >
          {optionsYears.map(({ label, value }, i) => (
            <Select.Item
              textAlign={"center"}
              label={label}
              value={value}
              key={i}
            />
          ))}
        </Select>
      </Box>
    </Center>
  );
}
