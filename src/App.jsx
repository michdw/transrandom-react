/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "./Animation.css";
import "./Scale.css";
import React from "react";

import GamePanel from "./components/GamePanel";

export default function App() {
  const optionCount = 5;

  return (
    <section className="App">
      <GamePanel optionCount={optionCount} />
    </section>
  );
}
