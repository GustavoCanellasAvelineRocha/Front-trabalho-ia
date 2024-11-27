import { createContext, useState } from "react";

const API = "http://127.0.0.1:5000/game/";

export const RequestsContext = createContext();

export const RequestsContextProvinder = ({ children }) => {
  const [statusGame, setStatusGame] = useState("NOT_STARTED");
  const [statusRequest, setStatusRequest] = useState("OK");
  const [minimax, setMinimax] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [nextMove, setnextMove] = useState("");
  const [modo, setModo] = useState("minimax");

  async function sendStatusGame(board) {
    try {
      console.log(board);
      console.log(difficulty);
      setStatusRequest("Loading");

      const newBoard = board.map((row) =>
        row.map((cell) => cell.toLowerCase())
      );

      const response = await fetch(API + "minimax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: newBoard, difficulty: difficulty }),
      });

      if (!response.ok) {
        throw new Error("Erro com api");
      }

      const data = await response.json();

      console.log(data);

      setnextMove(data.next_move);
      setMinimax(data.used_minimax);
      setStatusRequest("OK");
      if (data.status === "DRAW") {
        setStatusGame("DRAW");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function sendStatusGameRede(board) {
    try {
      console.log(board);
      setStatusRequest("Loading");

      const newBoard = board.map((row) =>
        row.map((cell) => cell.toLowerCase())
      );

      const response = await fetch(API + "network", {
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

      setnextMove(data.next_move);
      setStatusRequest("OK");
      if (data.status === "DRAW") {
        setStatusGame("DRAW");
      } else if (data.status === "CORRUPTED") {
        setStatusGame("CORRUPTED");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function sendTraining() {
    try {
      const response = await fetch("http://127.0.0.1:5000/training/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [board_state, setBoard_state] = useState("");
  const [playerVez, setPlayerVez] = useState("X");
  const [curr_fitness, setCurr_Fitness] = useState("");
  const [generation, setGeneration] = useState("");

  async function sendTrainingStep(board) {
    try {
      console.log(board);

      const newBoard = board.map((row) =>
        row.map((cell) => cell.toLowerCase())
      );

      const response = await fetch("http://127.0.0.1:5000/training/step", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: newBoard }),
      });

      if (!response.ok) {
        throw new Error("Erro com api");
      }

      const data = await response.json();

      console.log(data.board_state);

      setBoard_state(data.board_state);
      setnextMove(data.last_move);
      setDifficulty(data.difficulty);
      setGeneration(data.generation);
      setPlayerVez(data.playerVez);
    } catch (error) {
      console.log(error);
    }
  }

  async function esperar() {
    await sleep(10000);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <RequestsContext.Provider
      value={{
        statusGame,
        sendStatusGame,
        setStatusGame,
        statusRequest,
        setMinimax,
        minimax,
        difficulty,
        setDifficulty,
        nextMove,
        setnextMove,
        setStatusRequest,
        modo,
        setModo,
        sendStatusGameRede,
        sendTraining,
        sendTrainingStep,
        board_state,
        playerVez,
        curr_fitness,
        generation,
        esperar,
        setBoard_state,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};
