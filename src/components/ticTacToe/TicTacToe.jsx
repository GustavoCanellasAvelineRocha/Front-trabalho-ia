import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./TicTacToe.css";
import { RequestsContext } from "../../context/RequestsContext";

export default function TicTacToe() {
  const [board, setBoard] = useState([
    ["b", "b", "b"],
    ["b", "b", "b"],
    ["b", "b", "b"],
  ]);
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

  const handleClick = async (row, col) => {
    if (statusGame === "NOT_STARTED") {
      setStatusGame("NOT_OVER");
    }

    if (
      board[row][col] !== "b" ||
      (statusGame !== "NOT_OVER" && statusGame !== "NOT_STARTED")
    )
      return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return "X";
        }
        return cell;
      })
    );

    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setStatusGame("X_WON");
    }

    togglePlayer();
    setStatusRequest("Loading");
    await sleep(500);
    sendApi(newBoard);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (nextMove && statusGame === "NOT_OVER") {
      const updatedBoard = board.map((r, rowIndex) =>
        r.map((cell, colIndex) => {
          if (rowIndex === nextMove[0] && colIndex === nextMove[1]) {
            return "O";
          }
          return cell;
        })
      );

      setBoard(updatedBoard);

      if (checkWinner(updatedBoard)) {
        setStatusGame("O_WON");
      } else {
        togglePlayer();
      }
    }
  }, [nextMove]);

  const sendApi = async (newBoard) => {
    await sendStatusGame(newBoard);
  };

  const restartGame = () => {
    setMinimax("");
    setStatusGame("NOT_STARTED");
    setBoard([
      ["b", "b", "b"],
      ["b", "b", "b"],
      ["b", "b", "b"],
    ]);
  };

  const renderCell = (row, col) => {
    const value = board[row][col];
    if (statusGame !== "NOT_OVER" && statusGame !== "NOT_STARTED") {
      return <div className="cell noPointer">{value === "b" ? "" : value}</div>;
    }
    if (statusRequest !== "OK") {
      return <div className="cell loading">{value === "b" ? "" : value}</div>;
    }
    return (
      <div className="cell" onClick={() => handleClick(row, col)}>
        {value === "b" ? "" : value}
      </div>
    );
  };

  const handleClickDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const checkWinner = (board) => {
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] !== "b" &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        return board[row][0];
      }
    }
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] !== "b" &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        return board[0][col];
      }
    }
    if (
      board[0][0] !== "b" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] !== "b" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }
    return null;
  };

  return (
    <div className="container">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((_, colIndex) => renderCell(rowIndex, colIndex))
        )}
      </div>
      {statusGame === "NOT_STARTED" ? (
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
      ) : statusGame !== "NOT_OVER" ? (
        <button className="buttonPlayAgain" onClick={restartGame}>
          Jogar novamente
        </button>
      ) : (
        <p className="method hasGame">Tem jogo!</p>
      )}
    </div>
  );
}
