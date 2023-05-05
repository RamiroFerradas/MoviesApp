import React, { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function useLoadFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        "roboto-light": require("../Assets/Fonts/Roboto/Roboto-Light.ttf"),
        // "310-paperboard": require("../Assets/Fonts/310 Paperboard/Paperboard.ttf"),
        // "309-bonnevarc": require("../Assets/Fonts/310 Paperboard/Paperboard.ttf"),
      });
      console.info("Fonts loaded successfully");
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  };

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return { fontsLoaded };
}
