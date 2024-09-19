import React, { useState, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./TicTacToe.css";

export default function TicTacToe() {
  const [board, setBoard] = useState([
    ["b", "b", "b"],
    ["b", "b", "b"],
    ["b", "b", "b"],
  ]);
  const { currentPlayer, togglePlayer } = useContext(PlayerContext);

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

  const sendApi = (newBoard) => {
    console.log(newBoard);
  };

  const renderCell = (row, col) => {
    const value = board[row][col];

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
    </div>
  );
}
