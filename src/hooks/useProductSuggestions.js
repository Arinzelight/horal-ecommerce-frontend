import { useState, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import api from "../utils/api";

export default function useProductSuggestions(delay = 300) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedFetchRef = useRef(
    debounce(async (value) => {
      try {
        setLoading(true);
        const { data } = await api.get("/product", {
          params: { search: value },
        });
        setSuggestions(data.results || []);
      } catch (err) {
        console.error("Suggestion fetch failed", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, delay)
  );

  useEffect(() => {
    return () => {
      debouncedFetchRef.current.cancel();
    };
  }, []);

  const fetchSuggestions = (value) => {
    if (value.trim().length >= 2) {
      debouncedFetchRef.current(value);
    } else {
      setSuggestions([]);
    }
  };

  return {
    suggestions,
    loading,
    fetchSuggestions,
    clearSuggestions: () => setSuggestions([]),
  };
}
