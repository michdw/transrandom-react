import "./App.css";
import React, { useState } from "react";
import {translate, getLanguages} from "./TranslatorUtils"

export default function App() {
  const [inputText, setInputText] = useState("");

  const handleTranslate = () => {
    translate(inputText)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetLanguages = () => {
    getLanguages()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleTranslate}>Click to translate</button>
      <button onClick={handleGetLanguages}>print languages</button>
    </div>
  );
}
