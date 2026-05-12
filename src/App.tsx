import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [currentX, setCurrentX] = useState(true);

  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );

  const [winner, setWinner] = useState<string | null>(null);

  const [winningSquares, setWinningSquares] = useState<number[]>(
    []
  );

  const isDraw = useMemo(() => {
    return squares.every((square) => square !== null) && !winner;
  }, [squares, winner]);

  useEffect(() => {
    checkWinner();
  }, [squares]);

  function checkWinner() {
    for (let i = 0; i < winArray.length; i++) {
      const [a, b, c] = winArray[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);

        setWinningSquares([a, b, c]);

        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index: number) {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];

    nextSquares[index] = currentX ? "X" : "O";

    setSquares(nextSquares);

    setCurrentX(!currentX);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));

    setWinner(null);

    setWinningSquares([]);

    setCurrentX(true);
  }

  return (
    <main
      className="
        min-h-screen
        flex items-center justify-center
        px-4 py-10
      "
    >
      <section
        className="
          w-full max-w-md
          bg-card
          border border-border
          rounded-[2rem]
          shadow-xl
          p-6 md:p-8
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between mb-8">
          <div>
            <p
              className="
                text-xs uppercase
                tracking-[0.3em]
                text-muted-foreground
                mb-2
              "
            >
              Game
            </p>

            <h1 className="text-3xl font-bold">
              Tic Tac Toe
            </h1>
          </div>

          <button
            onClick={handleReset}
            className="
              h-11 w-11
              rounded-2xl
              bg-muted
              hover:bg-primary
              hover:text-primary-foreground
              transition-all duration-300
              flex items-center justify-center
              active:scale-95
            "
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {/* STATUS */}

        <div
          className="
            mb-8
            rounded-2xl
            border border-border
            bg-muted/50
            px-5 py-4
          "
        >
          {winner ? (
            <div className="flex items-center gap-3">
              <div
                className="
                  h-4 w-4 rounded-full
                  bg-secondary
                  animate-pulse
                "
              />

              <p className="font-medium">
                Player{" "}
                <span className="text-primary font-bold">
                  {winner}
                </span>{" "}
                wins the game
              </p>
            </div>
          ) : isDraw ? (
            <div className="flex items-center gap-3">
              <div
                className="
                  h-4 w-4 rounded-full
                  bg-accent
                "
              />

              <p className="font-medium">
                It's a draw
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className={`
                  h-4 w-4 rounded-full
                  ${
                    currentX
                      ? "bg-primary"
                      : "bg-secondary"
                  }
                `}
              />

              <p className="font-medium">
                Current turn:
                <span
                  className={`
                    ml-2 font-bold
                    ${
                      currentX
                        ? "text-primary"
                        : "text-secondary"
                    }
                  `}
                >
                  {currentX ? "X" : "O"}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* BOARD */}

        <div className="grid grid-cols-3 gap-3">
          {squares.map((square, index) => {
            const isWinningCell =
              winningSquares.includes(index);

            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`
                  aspect-square
                  rounded-[1.5rem]
                  border
                  text-4xl md:text-5xl
                  font-bold
                  transition-all duration-300
                  active:scale-95

                  ${
                    isWinningCell
                      ? "bg-green-300 text-primary-foreground border-primary scale-105"
                      : "bg-card border-border hover:bg-muted"
                  }

                  ${
                    square === "X"
                      ? "text-primary"
                      : "text-secondary"
                  }
                `}
              >
                <span
                  className={`
                    inline-block
                    transition-transform duration-300
                    ${
                      square
                        ? "scale-100 rotate-0"
                        : "scale-0 rotate-45"
                    }
                  `}
                >
                  {square}
                </span>
              </button>
            );
          })}
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-8
            flex items-center justify-between
            text-sm text-muted-foreground
          "
        >
          <p>
            First player to align 3 symbols wins
          </p>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-secondary" />
          </div>
        </div>
      </section>
    </main>
  );
}