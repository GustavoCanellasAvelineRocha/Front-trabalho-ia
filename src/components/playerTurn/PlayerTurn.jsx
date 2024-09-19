import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./PlayerTurn.css";

export default function PlayerTurn() {
  const { currentPlayer, togglePlayer } = useContext(PlayerContext);

  const handlePlayerChange = (e) => {
    togglePlayer(e.target.value);
  };

  return (
    <div className="player-toggle-container">
      <p className="current-player-text">Vez do jogador: {currentPlayer}</p>
      <div className="radio-container">
        <label
          className={`radio-label ${currentPlayer === "X" ? "active" : ""}`}
        >
          <input
            type="radio"
            value="X"
            checked={currentPlayer === "X"}
            disabled
          />
          X
        </label>
        <label
          className={`radio-label ${currentPlayer === "O" ? "active" : ""}`}
        >
          <input
            type="radio"
            value="O"
            checked={currentPlayer === "O"}
            disabled
          />
          O
        </label>
      </div>
    </div>
  );
}
