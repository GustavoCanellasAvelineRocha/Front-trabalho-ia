import { createContext, useState } from "react";

const API = "http://127.0.0.1:5000/game/status";

export const RequestsContext = createContext();

export const RequestsContextProvinder = ({ children }) => {
  const [statusGame, setStatusGame] = useState("NOT_STARTED");
  const [statusRequest, setStatusRequest] = useState("OK");
  const [minimax, setMinimax] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [nextMove, setnextMove] = useState("");

  async function sendStatusGame(board) {
    try {
      console.log(board);
      console.log(difficulty);
      setStatusRequest("Loading");

      const newBoard = board.map((row) =>
        row.map((cell) => cell.toLowerCase())
      );

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: newBoard, difficulty: difficulty }),
      });

      if (!response.ok) {
        throw new Error("Erro com api");
      }

      const data = await response.json();

      console.log(data);

      setnextMove(data.next_move);
      setMinimax(data.used_minimax);
      setStatusRequest("OK");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RequestsContext.Provider
      value={{
        statusGame,
        sendStatusGame,
        setStatusGame,
        statusRequest,
        setMinimax,
        minimax,
        difficulty,
        setDifficulty,
        nextMove,
        setnextMove,
        setStatusRequest,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};
