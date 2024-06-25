/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React from "react";

import GamePanel from "./components/GamePanel";

export default function App() {
  const optionCount = 5;

  return (
    <section className="App">
      <GamePanel className="discussion" optionCount={optionCount} />
      <div style={{ fontSize: "10px" }}>
        This app is under construction- will look better soon!
      </div>
    </section>
  );
}
