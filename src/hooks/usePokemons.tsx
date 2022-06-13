import { useState } from "react";

import { Pokemon } from "../types";
import api from "../api";

export function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [answer, setAnswer] = useState<number>(-1);

  const fetchData = async () => {
    const res1 = await api.random();
    const res2 = await api.random();
    const array = [res1, res2];
    setPokemons(array);
    const number = Math.round(Math.random());
    setAnswer(number);
  };

  return {
    pokemons,
    answer,
    fetchData,
  };
}
