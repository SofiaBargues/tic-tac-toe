import { useState } from "react";

const WINNER_COMPS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const GRID = Array.from(Array(9).keys());

function App() {
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [plays, setPlays] = useState<Map<number, "X" | "O">>(new Map());

  function handleClick(cell: number) {
    if (plays.has(cell)) return;
    const draft = new Map(plays).set(cell, player);

    const winner = WINNER_COMPS.find((comp) =>
      comp.every((cell) => draft.get(cell) === player)
    );
    setPlays(draft);

    if (winner) {
      setTimeout(() => {
        alert(`${player} wins! `);
        setPlays(new Map());
      }, 100);
      return;
    }

    setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  }
  return (
    <main>
      {GRID.map((i) => (
        <button onClick={() => handleClick(i)} key={i} className="square">
          {plays.get(i)}
        </button>
      ))}
    </main>
  );
}

export default App;
