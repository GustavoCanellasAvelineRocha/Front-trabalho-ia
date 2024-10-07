import { createContext, useState } from "react";

const API = "https://usual-bren-intel-artf-215e03f8.koyeb.app/game/status";

export const RequestsContext = createContext();

export const RequestsContextProvinder = ({ children }) => {
  const [statusGame, setStatusGame] = useState("NOT_OVER");
  const [statusRequest, setStatusRequest] = useState("OK");
  const [decidedMethod, setDecidedMethod] = useState("");

  async function sendStatusGame(board) {
    try {
      console.log(board);
      setStatusRequest("Loading");

      const newBoard = board.map((row) =>
        row.map((cell) => cell.toLowerCase())
      );

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: newBoard }),
      });

      if (!response.ok) {
        throw new Error("Erro com api");
      }

      const data = await response.json();

      console.log(data);

      setStatusGame(data.status);
      setDecidedMethod(data.model_used);
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
        decidedMethod,
        setDecidedMethod,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};
