/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { callTranslate, callGetLanguages } from "./TranslatorUtils";

export default function App() {
  //state
  const [allLanguages, setAllLanguages] = useState();
  const [languageOptions, setLanguageOptions] = useState();
  const [targetLanguage, setTargetLanguage] = useState();
  const [optionCount, setOptionCount] = useState(5);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [gameActive, setGameActive] = useState(false);

  const dataFetchedRef = useRef(false);

  //get languages on load
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleGetLanguages();
  }, []);

  const handleGetLanguages = () => {
    callGetLanguages()
      .then((response) => {
        setAllLanguages(response.data.languages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //translate sequence
  useEffect(() => {
    if (languageOptions) {
      console.log(languageOptions);
      getTargetLanguage();
    }
  }, [languageOptions]);

  useEffect(() => {
    if (targetLanguage) {
      console.log(targetLanguage)
      handleTranslate();
    }
  }, [targetLanguage]);

  function getLanguageOptions() {
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
    setLanguageOptions(objects);
  }

  function getTargetLanguage() {
    let i = Math.floor(Math.random() * languageOptions.length);
    setTargetLanguage(languageOptions[i]);
  }

  function handleTranslate () {
    if (!gameActive) setGameActive(true);
    callTranslate(inputText, targetLanguage.code)
      .then((response) => {
        console.log(response.data.translatedText);
        setOutputText(response.data.translatedText);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // elements

  const outputPanel = () => {
    return (
      <div>
        <strong>{outputText}</strong>
      </div>
    );
  };

  const optionPanel = () => {
    return (
      <ul>
        {languageOptions &&
          languageOptions.map((option) => (
            <li key={option.name}>{option.name}</li>
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
      <button disabled={inputText.length < 2} onClick={getLanguageOptions}>
        Click to translate
      </button>
      {gameActive && outputPanel()}
      {gameActive && optionPanel()}
    </div>
  );
}
