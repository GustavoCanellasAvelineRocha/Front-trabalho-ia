import "./Main.css";
import PlayerTurn from "../playerTurn/PlayerTurn";
import TicTacToe from "../ticTacToe/TicTacToe";
import Footer from "../footer/Footer";
import Header from "../header/Header";

export default function Main() {
  return (
    <main className="main">
      <Header />
      <PlayerTurn />
      <TicTacToe />
      <Footer />
    </main>
  );
}
