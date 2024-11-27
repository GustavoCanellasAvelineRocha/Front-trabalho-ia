import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./TicTacToe.css";
import { RequestsContext } from "../../context/RequestsContext";
import Minimax from "./../minimax/Minimax";

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
    modo,
    setModo,
    sendStatusGameRede,
    sendTraining,
    sendTrainingStep,
    board_state,
    generation,
    playerVez,
    esperar,
    setBoard_state,
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

  const handleClickRede = async (row, col) => {
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
          return "O";
        }
        return cell;
      })
    );

    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setStatusGame("O_WON");
    }

    togglePlayer();
    setStatusRequest("Loading");
    await sleep(500);
    sendApi(newBoard);
  };

  function startGame() {
    if (statusGame === "NOT_STARTED") {
      setStatusGame("NOT_OVER");
    }
    sendApi(board);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleClickModo = (newmodo) => {
    setModo(newmodo);
  };

  useEffect(() => {
    if (nextMove && statusGame === "NOT_OVER" && modo === "minimax") {
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

  useEffect(() => {
    if (nextMove && statusGame === "NOT_OVER" && modo === "contraRede") {
      const updatedBoard = board.map((r, rowIndex) =>
        r.map((cell, colIndex) => {
          if (rowIndex === nextMove[0] && colIndex === nextMove[1]) {
            return "X";
          }
          return cell;
        })
      );

      setBoard(updatedBoard);

      if (checkWinner(updatedBoard)) {
        setStatusGame("X_WON");
      } else {
        togglePlayer();
      }
    }
  }, [nextMove]);

  useEffect(() => {
    if (nextMove && statusGame === "TRAINING") {
      if (currentPlayer === "X") {
        const updatedBoard = board.map((r, rowIndex) =>
          r.map((cell, colIndex) => {
            if (rowIndex === nextMove[0] && colIndex === nextMove[1]) {
              return "X";
            }
            return cell;
          })
        );
        setBoard(updatedBoard);

        if (checkWinner(updatedBoard)) {
          setBoard_state("X_WON");
        } else {
          togglePlayer();
        }
      } else {
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
          setBoard_state("O_WON");
        } else {
          togglePlayer();
        }
      }
    }
  }, [nextMove]);

  useEffect(() => {
    const handleEffect = async () => {
      if (board_state !== "NOT_OVER" && statusGame === "TRAINING") {
        setBoard([
          ["b", "b", "b"],
          ["b", "b", "b"],
          ["b", "b", "b"],
        ]);
        setCurrentPlayer("X");
      }
    };

    handleEffect();
  }, [board]);

  const sendApi = async (newBoard) => {
    if (modo === "contraRede") {
      await sendStatusGameRede(newBoard);
    }
    if (modo === "minimax") {
      await sendStatusGame(newBoard);
    }
  };

  const restartGame = () => {
    setModo("minimax");
    setMinimax("");
    setStatusGame("NOT_STARTED");
    setBoard([
      ["b", "b", "b"],
      ["b", "b", "b"],
      ["b", "b", "b"],
    ]);
  };

  const startTraining = async () => {
    await sendTraining();
    setStatusGame("TRAINING");

    let trainingRunning = true;

    while (trainingRunning) {
      await sendTrainingStep(board);

      await sleep(8000);
    }
  };

  const renderCell = (row, col) => {
    const value = board[row][col];

    if (modo === "TreinoRede") {
      return (
        <div className={`cell noPointer `}>{value === "b" ? "" : value}</div>
      );
    }
    if (statusGame !== "NOT_OVER" && statusGame !== "NOT_STARTED") {
      return (
        <div className={`cell noPointer `}>{value === "b" ? "" : value}</div>
      );
    }
    if (statusRequest !== "OK") {
      return (
        <div className={`cell loading `}>{value === "b" ? "" : value}</div>
      );
    }

    if (
      modo === "contraRede" &&
      (statusGame === "NOT_STARTED" || statusRequest !== "OK")
    ) {
      return <div className={`cell`}>{value === "b" ? "" : value}</div>;
    }

    if (modo === "contraRede" && statusGame !== "NOT_STARTED") {
      return (
        <div className={`cell `} onClick={() => handleClickRede(row, col)}>
          {value === "b" ? "" : value}
        </div>
      );
    }

    return (
      <div className={`cell `} onClick={() => handleClick(row, col)}>
        {value === "b" ? "" : value}
      </div>
    );
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
          <p className="current-player-text mg">Escolha o Modo!</p>
          <div className="radio-container gap">
            <label
              className={`radio-label-modo padding ${
                modo === "minimax" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                value="minimax"
                checked={modo === "minimax"}
                onClick={(event) => handleClickModo(event.target.value)}
              />
              Contra Minimax
            </label>
            <label
              className={`radio-label-modo padding ${
                modo === "TreinoRede" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                value="TreinoRede"
                checked={modo === "TreinoRede"}
                onClick={(event) => handleClickModo(event.target.value)}
              />
              Treinar Rede
            </label>
            <label
              className={`radio-label-modo padding ${
                modo === "contraRede" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                value="contraRede"
                checked={modo === "contraRede"}
                onClick={(event) => handleClickModo(event.target.value)}
              />
              Contra Rede
            </label>
          </div>
          {modo === "minimax" && <Minimax />}
          {modo === "TreinoRede" && (
            <button className="buttonPlayAgain" onClick={startTraining}>
              Iniciar treino!
            </button>
          )}
          {modo === "contraRede" && statusGame === "NOT_STARTED" && (
            <button className="buttonPlayAgain" onClick={startGame}>
              Iniciar jogo!
            </button>
          )}
          {modo === "contraRede" && statusGame === "NOT_OVER" && (
            <p className="dificuldade">
              Clique no tabuleiro para fazer sua jogada!
            </p>
          )}
        </>
      ) : board_state === "CORRUPTED" ? (
        <>
          <p className="current-player-text mg">
            <b>
              Erro: O jogo foi corrompido. A rede jogou em um lugar inviável.
            </b>
          </p>

          {nextMove && nextMove.length > 0 && (
            <p className="current-player-text mg">
              Errou ao tentar Jogar em:{" "}
              {`Linha: ${nextMove[0]}, Coluna: ${nextMove[1]}`}
            </p>
          )}
          {difficulty && (
            <p className="current-player-text mg">Dificuldade: {difficulty}</p>
          )}
          {generation && (
            <p className="current-player-text mg">Geração: {generation}</p>
          )}
          {playerVez && (
            <p className="current-player-text mg">
              Jogador da vez: {playerVez}
            </p>
          )}
        </>
      ) : board_state !== "CORRUPTED" && board_state !== "NOT_OVER" ? (
        <>
          {board_state === "X_WON" && (
            <p className="current-player-text mg">A rede ganhou!</p>
          )}
          {board_state === "O_WON" && (
            <p className="current-player-text mg">O mimimax ganhou!</p>
          )}
          {board_state === "DRAW" && (
            <p className="current-player-text mg">Empate!</p>
          )}

          {difficulty && (
            <p className="current-player-text mg">Dificuldade: {difficulty}</p>
          )}
          {generation !== 0 && (
            <p className="current-player-text mg">Geração: {generation}</p>
          )}
          {generation === 0 && (
            <p className="current-player-text mg">Geração: 0</p>
          )}
          {playerVez && (
            <p className="current-player-text mg">
              Jogador da vez: {playerVez}
            </p>
          )}
        </>
      ) : statusGame === "TRAINING" ? (
        <>
          <p className="current-player-text mg">
            <b>Treinando a rede neural...</b>
          </p>
        </>
      ) : statusGame === "CORRUPTED" ? (
        <>
          <p className="current-player-text mg">
            <b>A rede neural jogou em um posição Inválida</b>
          </p>
          {nextMove && nextMove.length > 0 && (
            <p className="current-player-text mg">
              Errou ao tentar Jogar em:{" "}
              {`Linha: ${nextMove[0]}, Coluna: ${nextMove[1]}`}
            </p>
          )}
          <button className="buttonPlayAgain" onClick={restartGame}>
            Voltar ao menu
          </button>
        </>
      ) : statusGame !== "NOT_OVER" ? (
        <button className="buttonPlayAgain" onClick={restartGame}>
          Voltar ao menu
        </button>
      ) : (
        <p className="method hasGame">Tem jogo!</p>
      )}
    </div>
  );
}
