import { useEffect, useState } from "react";
import { usePokemons } from "./hooks/usePokemons";

function App() {
  const { pokemons, fetchData, answer } = usePokemons();
  const [silloueteSrc, setSilloueteSrc] = useState<string>("");
  const [imageColor, setImageColor] = useState<"original" | "sillouete">(
    "sillouete"
  );
  const [isCorrect, setIsCorrect] = useState<Boolean | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) {
      if (answer === 0) setSilloueteSrc(pokemons[0].image);
      else setSilloueteSrc(pokemons[1].image);
    }
  }, [pokemons]);

  const sendAnswer = (arg: number): void => {
    setImageColor("original");
    if (arg === answer) setIsCorrect(true);
    else setIsCorrect(false);
  };

  const restart = () => {
    fetchData().then((e) => {
      setIsCorrect(null);
      setImageColor("sillouete");
    });
  };

  if (answer === -1) {
    return (
      <main>
        <div className=".dot-flashin"></div>
      </main>
    );
  } else
    return (
      <main>
        <div>Let&apos;s get this party started</div>
        <div>
          {isCorrect === true && (
            <span className="nes-text is-success">Correct!</span>
          )}
          {isCorrect === false && (
            <span className="nes-text is-error">Wrong!</span>
          )}
        </div>
        <div>{isCorrect !== null && pokemons[answer].name}</div>

        <div>
          <img id={imageColor} src={silloueteSrc} />
        </div>
        {isCorrect === null && (
          <div className="stack">
            <a className="nes-btn" onClick={() => sendAnswer(0)}>
              {pokemons[0].name}
            </a>
            <a className="nes-btn mt-2" onClick={() => sendAnswer(1)}>
              {pokemons[1].name}
            </a>
          </div>
        )}
        {isCorrect !== null && (
          <div className="stack">
            <a className="nes-btn" onClick={() => restart()}>
              {" "}
              Restart{" "}
            </a>
          </div>
        )}
      </main>
    );
}

export default App;
