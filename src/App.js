import "./App.css";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { translate, getLanguages } from "./TranslatorUtils";

export default function App() {
  //state
  const [allLanguages, setAllLanguages] = useState();
  const [options, setOptions] = useState();
  const [optionCount, setOptionCount] = useState(5);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [gameActive, setGameActive] = useState(false);

  const dataFetchedRef = useRef(false);

  //api
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleGetLanguages();
  }, []);

  useEffect(() => {
    if (allLanguages) {
      getOptions();
    }
  }, [allLanguages]);

  const handleTranslate = () => {
    if (!gameActive) setGameActive(true);
    translate(inputText, selectTargetLanguage().code)
      .then((response) => {
        console.log(response.data.translatedText);
        setOutputText(response.data.translatedText);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetLanguages = () => {
    getLanguages()
      .then((response) => {
        setAllLanguages(response.data.languages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const outputPanel = () => {
    return (
      <div>
        <strong>{outputText}</strong>
      </div>

      // <p>output</p>
    );
  };

  const optionPanel = () => {
    return (
      <ul>
        {options &&
          options.map((option) => <li key={option.name}>{option.name}</li>)}
      </ul>
    );
  };

  //

  function getOptions() {
    let indexes = [];
    while (indexes.length < optionCount) {
      let n = Math.floor(Math.random() * allLanguages.length);
      indexes.indexOf(n) === -1 && indexes.push(n);
    }
    let objects = [];
    for (let i = 0; i < optionCount; i++) {
      let j = indexes[i];
      objects.push(allLanguages[j]);
    }
    setOptions(objects);
  }

  function selectTargetLanguage() {
    let i = Math.floor(Math.random() * options.length);
    return options[i];
  }

  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button disabled={inputText.length < 2} onClick={handleTranslate}>
        Click to translate
      </button>
      {gameActive && outputPanel()}
      {gameActive && optionPanel()}
    </div>
  );
}
