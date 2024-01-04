import "./App.css";
import React, { useEffect, useState } from "react";
import { translate, getLanguages } from "./TranslatorUtils";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [indexes, setIndexes] = useState([])
  const [optionQty, setOptionQty] = useState(5)


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
        getOptions(response.data.languages, optionQty)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOptions = (languages, qty) => {
    let range = languages.length
    let newIndexes = []
    while(newIndexes.length < qty) {
      let r = Math.floor(Math.random() * range)
      newIndexes.push(r)
    }
    console.log(newIndexes)
    setIndexes(newIndexes)
  }

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
      {/* <p>{languageNames}</p> */}
      
    </div>
  );
}
