import { createContext, useState } from "react";
import { API } from "../utils/api";

export const RequestsAPIContext = createContext();

export function RequestsAPIProvinder({ children }) {
  const [statusGame, setStatusGame] = useState(false);
  const [winner, setWinner] = useState("b");

  async function sendStatusGame(board) {
    try {
      const response = await fetch(`${API}/`);

      if (!response.ok) {
        throw new Error("");
      }

      const data = await response.json();
      
    } catch (error) {
      alert(error);
    }
  }

  function restartGame(){
    setStatusGame(false)
    setWinner("b")
  }

  return (
    <RequestsAPIContext.Provider >
      {children}
    </RequestsAPIContext.Provider>
  );
}