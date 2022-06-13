import { useEffect, useState, useMemo } from "react";
import { usePokemons } from "./hooks/usePokemons";

type PokemonDisplayType = "original" | "sillouete";

function App() {
  const { pokemons, refetchData, lastAnswer, isLoading } = usePokemons();
  const [imageColor, setImageColor] = useState<PokemonDisplayType>("sillouete");
  const [selectedAnswer, setSelectedAnswer] = useState<number>();

  const sendAnswer = (arg: number) => {
    setSelectedAnswer(arg);
    setImageColor("original");
  };

  const restart = async () => {
    setSelectedAnswer(undefined);
    setImageColor("sillouete");
    await refetchData();
  };

  const isCorrect = useMemo(
    () => lastAnswer === selectedAnswer,
    [selectedAnswer, lastAnswer]
  );
  const hasSelectedAnswer = selectedAnswer !== undefined;

  if (isLoading) {
    return (
      <main>
        <div className=".dot-flashing"></div>
      </main>
    );
  }

  return (
    <main>
      <div>Let&apos;s get this party started</div>
      <div>
        {isCorrect && hasSelectedAnswer && (
          <span className="nes-text is-success">Correct!</span>
        )}
        {!isCorrect && hasSelectedAnswer && (
          <span className="nes-text is-error">Wrong!</span>
        )}
      </div>
      <div>{hasSelectedAnswer && pokemons[lastAnswer].name}</div>
      <div>
        <img id={imageColor} src={pokemons[lastAnswer]?.image} />
      </div>
      {!hasSelectedAnswer && (
        <div className="stack">
          {pokemons.map((pokemon, idx) => {
            return (
              <button className="nes-btn" onClick={() => sendAnswer(idx)}>
                {pokemon.name}
              </button>
            );
          })}
        </div>
      )}
      {hasSelectedAnswer && (
        <div className="stack">
          <button className="nes-btn" onClick={() => restart()}>
            Restart
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
