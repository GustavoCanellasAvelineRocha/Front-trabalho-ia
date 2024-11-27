import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { RequestsContext } from "../../context/RequestsContext";

export default function Minimax() {
    const { currentPlayer, togglePlayer, setCurrentPlayer } =
    useContext(PlayerContext);
    const {
        statusGame,
        sendStatusGame,
        setStatusGame,
        statusRequest,
        difficulty,
        setDifficulty,
        setDecidedMethod,
        setStatusRequest,
        setMinimax,
        nextMove,
    } = useContext(RequestsContext);

    const handleClickDifficulty = (newDifficulty) => {
        setDifficulty(newDifficulty);
      };

    return (
        <>
        <p
          className={`dificuldade ${
            statusRequest === "Loading" ? "displayNone" : ""
          }`}
        >
          {" "}
          Selecione a Dificuldade{" "}
        </p>
        <div
          className={`${statusRequest === "Loading" ? "displayNone" : ""}`}
        >
          <div className="radio-container gap">
            <label
              className={`radio-label-difficulty padding ${
                difficulty === "easy" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                value="easy"
                checked={difficulty === "easy"}
                onClick={(event) => handleClickDifficulty(event.target.value)}
              />
              Fácil
            </label>
            <label
              className={`radio-label-difficulty padding ${
                difficulty === "medium" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                value="medium"
                checked={difficulty === "medium"}
                onClick={(event) => handleClickDifficulty(event.target.value)}
              />
              Médio
            </label>
            <label
              className={`radio-label-difficulty padding ${
                difficulty === "hard" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                value="hard"
                checked={difficulty === "hard"}
                onClick={(event) => handleClickDifficulty(event.target.value)}
              />
              Difícil
            </label>
          </div>
        </div>
      </>
    )
}