import React from "react";

export default function Scoreboard(props) {
  return (
    <section className="Scoreboard">
      <span className="score-num">{props.score}</span> out of{" "}
      <span className="score-num">{props.guesses}</span> correct
    </section>
  );
}
