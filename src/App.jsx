/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React from "react";

import GamePanel from "./components/GamePanel";

export default function App() {

  return (
    <section className="App">
      <GamePanel/>
      <div style={{ fontSize: "10px" }}>
        This app is under construction- will look better soon!
      </div>
    </section>
  );
}
