/* eslint-disable react-hooks/exhaustive-deps */
import "./styles/GamePanel.css";
import "./styles/Animation.css";
import "./styles/Header.css";
import React from "react";

import GamePanel from "./components/GamePanel";
import Header from "./components/Header";

export default function App() {
  const optionCount = 5;

  return (
    <section className="App">
      <Header/>
      <GamePanel optionCount={optionCount} />
    </section>
  );
}
