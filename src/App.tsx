import { useEffect, useState, useMemo } from "react";
import { usePokemons } from "./hooks/usePokemons";

function App() {
  const { pokemons, refetchData, lastAnswer, isLoading } = usePokemons();
  const [imageColor, setImageColor] = useState<"original" | "sillouete">(
    "sillouete"
  );
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

  const isCorrect = useMemo(() => lastAnswer === selectedAnswer, []);
  const hasSelectedAnswer = Boolean(selectedAnswer);

  if (isLoading) {
    return (
      <main>
        <div className=".dot-flashing"></div>
      </main>
    );
  }

  console.log({ pokemons, lastAnswer });

  return (
    <main>
      <div>Let&apos;s get this party started</div>
      <div>
        {isCorrect && <span className="nes-text is-success">Correct!</span>}
        {!isCorrect && <span className="nes-text is-error">Wrong!</span>}
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
