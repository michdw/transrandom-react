/* eslint-disable react-hooks/exhaustive-deps */
import "./styles/GamePanel.css";
import "./styles/Animation.css";
import "./styles/Footer.css";
import React from "react";
import trdark from "../src/assets/trdark.png";


import GamePanel from "./components/GamePanel";
import Footer from "./components/Footer";

export default function App() {
  const optionCount = 5;

  return (
    <section className="App">
      <img className="tr-icon" src={trdark} alt="react logo" />
      <div className="bg-pattern"></div>
      <GamePanel optionCount={optionCount} />
      <Footer />
    </section>
  );
}
