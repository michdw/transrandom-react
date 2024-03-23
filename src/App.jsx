/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React from "react";

import GamePanel from "./components/GamePanel";

export default function App() {
  const optionCount = 5;

  return (
    <section className="App">
      <GamePanel optionCount={optionCount} />
      <div style={{ fontSize: "10px" }}>
        This app is under construction- will look better soon!
      </div>

      <section className="discussion">
        <div className="bubble-container sender">
          <div className="bubble">This is a speech bubble</div>
        </div>
        <div className="bubble-container recipient">
          <div className="bubble">This is also a speech bubble</div>
        </div>
      </section>

    </section>
  );
}
