import {
  Box,
  Divider,
  NativeBaseProvider,
  StatusBar,
  Text,
  extendTheme,
} from "native-base";
import { useEffect, useState } from "react";
import { NativeRouter } from "react-router-native";
import { MoviesProvider } from "./src/Context/MoviesContext";
import { FavouritesProvider } from "./src/Context/FavouritesContext";
import { SafeAreaView } from "react-native";
import NavigationBar from "./src/Componentes/NavigationBar/NavigationBar";
import RouterController from "./src/Routes/RouterController";
import * as Font from "expo-font";
import useLoadFonts from "./src/Hooks/useLoadFonts";

export default function App() {
  const theme = extendTheme({
    colors: {
      brand: {
        900: "#1f1f1f",
        800: "#2c2c2c",
        700: "#3a3a3a",
      },
    },
  });

  useLoadFonts();

  return (
    <NativeBaseProvider theme={theme}>
      <NativeRouter>
        <MoviesProvider>
          <FavouritesProvider>
            <SafeAreaView flex={1} backgroundColor="#1f1f1f">
              <StatusBar
                backgroundColor={"#1f1f1f"}
                barStyle={"light-content"}
              />
              <Text
                color="white"
                fontSize={20}
                fontWeight="bold"
                textAlign="center"
                fontFamily={"roboto-light"}
              >
                Películas y series favoritas
              </Text>
              <NavigationBar />
              <Box width={"400px"} paddingX={4}>
                <Divider />
              </Box>
              <RouterController />
            </SafeAreaView>
          </FavouritesProvider>
        </MoviesProvider>
      </NativeRouter>
    </NativeBaseProvider>
  );
}
