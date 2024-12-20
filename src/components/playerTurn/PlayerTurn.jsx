import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { RequestsContext } from "../../context/RequestsContext";
import "./PlayerTurn.css";

export default function PlayerTurn() {
  const { currentPlayer } = useContext(PlayerContext);

  const { statusGame, minimax, statusRequest } = useContext(RequestsContext);

  return (
    <>
      {statusGame === "NOT_OVER" ||
      statusGame === "NOT_STARTED" ||
      statusGame === "TRAINING" ? (
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
          {minimax !== "" && statusRequest === "OK" ? (
            <p className="method">
              <b>Minimax foi usado?:</b> {minimax ? "Sim" : "Não"}
            </p>
          ) : null}
          {statusRequest !== "OK" ? (
            <p className="method">
              <b>Carregando...</b>
            </p>
          ) : null}
        </div>
      ) : (
        <>
          {statusGame === "X_WON" ? (
            <div className="player-toggle-container noMargin">
              <p className="current-player-text winner">
                🎉 Jogador X ganhou! 🎉
              </p>
            </div>
          ) : null}
          {statusGame === "O_WON" ? (
            <div className="player-toggle-container noMargin">
              <p className="current-player-text winner">
                🎉 Jogador O ganhou! 🎉
              </p>
            </div>
          ) : null}
          {statusGame === "DRAW" && statusGame !== "CORRUPTED" ? (
            <div className="player-toggle-container noMargin">
              <p className="current-player-text winner"> EMPATE! </p>
            </div>
          ) : null}
          {statusGame === "CORRUPTED" ? (
            <div className="player-toggle-container noMargin">
              <p className="current-player-text winner"> Erro da rede! </p>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
