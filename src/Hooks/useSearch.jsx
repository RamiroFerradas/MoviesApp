import { useEffect, useRef, useState } from "react";

export default function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef();

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
  }, []);

  return { search, updateSearch, error, setError };
}
