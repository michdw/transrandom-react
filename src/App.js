import "./App.css";
import React, { useEffect, useState } from "react";
import { translate, getLanguages } from "./TranslatorUtils";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [languageNames, setLanguageNames] = useState("unset");

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
        setLanguageNames(languageList(response.data.languages));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const languageList = (languages) => {
    return (
      <ul>
        {languages.map((lang) => (
          <li>{lang.name}</li>
        ))}
      </ul>
    );
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
      {languageNames}
    </div>
  );
}
