import "./App.css";
import React, { useEffect, useState } from "react";
import { translate, getLanguages } from "./TranslatorUtils";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [indexes, setIndexes] = useState([]);
  const [optionQty, setOptionQty] = useState(5);
  const [allLanguages, setAllLanguages] = useState();

  useEffect(() => handleGetLanguages(), [])

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
        setAllLanguages(response.data.languages);
        getOptions(allLanguages, optionQty);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOptions = (languages, qty) => {
    let range = languages.length;
    let newIndexes = [];
    while (newIndexes.length < qty) {
      let r = Math.floor(Math.random() * range);
      newIndexes.push(r);
    }
    console.log(newIndexes);
    setIndexes(newIndexes);
  };

  const getCodes = () => {
    return (
      <ul>
        {indexes.map((i) => {
          return <li>{allLanguages[i].code}</li>;
        })}
      </ul>
    );
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
      <button onClick={handleGetLanguages}>Print indexes</button>
      {/* <p>{languageNames}</p> */}
    </div>
  );
}
