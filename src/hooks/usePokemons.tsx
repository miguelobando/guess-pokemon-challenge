import { useState, useEffect, useCallback } from "react";

import { Pokemon } from "../types";
import api from "../api";

export function usePokemons() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [lastAnswer, setLastAnswer] = useState<number>(-1);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const [res1, res2] = await Promise.all([api.random(), api.random()]);
    setPokemons([res1, res2]);

    const randomAnswer = Math.round(Math.random());
    setLastAnswer(() => randomAnswer);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    pokemons,
    lastAnswer,
    refetchData: fetchData,
    isLoading,
  };
}
