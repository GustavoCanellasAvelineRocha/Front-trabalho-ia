import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PlayerProvider } from "./context/PlayerContext";
import { RequestsContextProvinder } from "./context/RequestsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PlayerProvider>
      <RequestsContextProvinder>
        <App />
      </RequestsContextProvinder>
    </PlayerProvider>
  </React.StrictMode>
);
