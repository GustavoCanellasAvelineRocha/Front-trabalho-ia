import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const togglePlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  return (
    <PlayerContext.Provider
      value={{ currentPlayer, togglePlayer, setCurrentPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
