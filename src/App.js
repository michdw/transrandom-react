/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { callTranslate, callGetLanguages } from "./TranslatorUtils";

export default function App() {
  //state
  const [allLanguages, setAllLanguages] = useState();
  const [optionCount, setOptionCount] = useState(5);
  const [languageOptions, setLanguageOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [targetLanguage, setTargetLanguage] = useState();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [currentStage, setCurrentStage] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(Boolean);

  const dataFetchedRef = useRef(false);

  //get languages on load
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleGetLanguages();
    console.log(currentStage);
  }, []);

  const handleGetLanguages = () => {
    callGetLanguages()
      .then((response) => {
        console.log(response);
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
      console.log(targetLanguage);
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

  function handleTranslate() {
    setCurrentStage(1);
    callTranslate(inputText, targetLanguage.code)
      .then((response) => {
        setOutputText(response.data.translatedText);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //

  function newGuess() {
    setCurrentStage(0);
    setLanguageOptions(null);
    setSelectedOption(null);
    setTargetLanguage(null);
    setInputText("");
    setOutputText("");
  }

  function selectOption(option) {
    setSelectedOption(option);
    console.log(option.code);
  }

  function submitGuess(selectedOption) {
    setCurrentStage(2);
    setAnswerCorrect(
      selectedOption.code === targetLanguage.code ? true : false
    );
  }

  // elements

  const translateButton = () => {
    return (
      <button
        disabled={inputText.length < 2 || currentStage !== 0}
        onClick={getLanguageOptions}
      >
        Click to translate
      </button>
    );
  };

  const optionPanel = () => {
    return (
      <div>
        <div>
          <strong>{outputText}</strong>
        </div>
        <ul>
          {languageOptions &&
            languageOptions.map((option) => (
              <div key={option.code}>
                <input
                  disabled={currentStage !== 1}
                  type="radio"
                  name="languageOption"
                  value={option.name}
                  onClick={() => selectOption(option)}
                />
                <label htmlFor={option.name}>{option.name}</label>
                <br />
              </div>
            ))}
        </ul>
      </div>
    );
  };

  const submitButton = () => {
    return (
      <button
        disabled={!selectedOption}
        type="submit"
        onClick={() => submitGuess(selectedOption)}
      >
        Submit guess
      </button>
    );
  };

  const resultMessage = () => {
    return answerCorrect ? <div>correct!</div> : <div>sorry, the correct answer was {targetLanguage.name}</div>;
  };

  const newGuessBtn = () => {
    return <button onClick={newGuess}>Play again</button>;
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      {currentStage === 0 && translateButton()}
      {optionPanel()}
      {currentStage === 1 && submitButton()}
      {currentStage === 2 && resultMessage()}
      {currentStage === 2 && newGuessBtn()}
    </div>
  );
}
