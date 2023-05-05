import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        }
      } catch (error) {
        console.log(`Error loading value for key "${key}", error`);
      }
    };

    loadValue();
  }, [key]);

  const updateValue = async (newValue) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.log(`Error loading value for key "${key}", ${error}`);
    }
  };

  return [value, updateValue];
}

export default useLocalStorage;
