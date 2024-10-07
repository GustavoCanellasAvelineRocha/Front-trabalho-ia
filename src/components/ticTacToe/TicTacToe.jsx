import React, { useState, useContext } from "react";
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
    decidedMethod,
    setDecidedMethod,
  } = useContext(RequestsContext);

  const handleClick = (row, col) => {
    if (board[row][col] !== "b") return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return currentPlayer;
        }
        return cell;
      })
    );

    setBoard(newBoard);
    togglePlayer();
    sendApi(newBoard);
  };

  const sendApi = async (newBoard) => {
    await sendStatusGame(newBoard);
  };

  const restartGame = () => {
    setStatusGame("NOT_OVER");
    setCurrentPlayer("X");
    setDecidedMethod("");
    setBoard([
      ["b", "b", "b"],
      ["b", "b", "b"],
      ["b", "b", "b"],
    ]);
  };

  const renderCell = (row, col) => {
    const value = board[row][col];

    if (statusGame !== "NOT_OVER") {
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

  return (
    <div className="container">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((_, colIndex) => renderCell(rowIndex, colIndex))
        )}
      </div>
      {statusGame !== "NOT_OVER" ? (
        <button className="buttonPlayAgain" onClick={() => restartGame()}>
          Jogar novamente
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
