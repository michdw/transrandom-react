/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { callTranslate } from "./TranslatorUtils";
import { supportedLanguages } from "./LanguageList";

export default function App() {
  const optionCount = 5;
  const allLanguages = getAllLanguages();

  //state
  const [languageOptions, setLanguageOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [targetLanguage, setTargetLanguage] = useState();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [gamePhase, setGamePhase] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(Boolean);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pastInputs, setPastInputs] = useState([]);

  //ref
  // const dataFetchedRef = useRef(false);
  const inputRef = useRef(null);

  function getAllLanguages() {
    let arr = [];
    for (let l in supportedLanguages) {
      arr.push({ code: supportedLanguages[l], name: l });
    }
    return arr;
  }

  //translate sequence

  useEffect(() => {
    if (languageOptions) {
      getTargetLanguage();
    }
  }, [languageOptions]);

  useEffect(() => {
    if (targetLanguage) {
      console.log(targetLanguage);
      handleTranslate();
    }
  }, [targetLanguage]);

  function submitText() {
    let isNew = true;
    for (let i = 0; i < pastInputs.length; i++) {
      if (inputText === pastInputs[i]) {
        isNew = false;
        setGamePhase(-1);
        setInputText("");
      }
    }
    if (isNew) {
      setPastInputs((prevPastInputs) => [...prevPastInputs, inputText]);
      getLanguageOptions();
    }
  }

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
    console.log(objects);
  }

  function getTargetLanguage() {
    let i = Math.floor(Math.random() * languageOptions.length);
    setTargetLanguage(languageOptions[i]);
  }

  function handleTranslate() {
    setLoading(true);
    callTranslate(inputText, targetLanguage.code)
      .then((response) => {
        let comparativeText = response.translations.translation.toLowerCase();
        if (inputText.toLowerCase() === comparativeText) {
          // if output text is identical to input text, reassign the target language and re-translate
          getTargetLanguage();
        } else {
          setLoading(false);
          setGamePhase(1);
          setOutputText(response.translations.translation);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // guess submission

  useEffect(() => {
    setScore((prevScore) => (answerCorrect ? prevScore + 1 : prevScore));
  }, [guesses]);

  function selectOption(option) {
    setSelectedOption(option);
  }

  function submitGuess(selectedOption) {
    setGamePhase(2);
    setAnswerCorrect(
      selectedOption.code === targetLanguage.code ? true : false
    );
    setGuesses((prevGuesses) => prevGuesses + 1);
  }

  function playAgain() {
    setGamePhase(0);
    setLanguageOptions(null);
    setSelectedOption(null);
    setTargetLanguage(null);
    setInputText("");
    setOutputText("");
  }

  // elements

  const translateButton = () => {
    return (
      <button
        disabled={inputText.length < 2 || gamePhase !== 0}
        onClick={submitText}
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
          <li>What language is this?</li>
        </div>
        <ul>
          {languageOptions &&
            languageOptions.map((option) => (
              <div key={option.code}>
                <input
                  disabled={gamePhase !== 1}
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
    return answerCorrect ? (
      <div>correct!</div>
    ) : (
      <div>sorry, the correct answer was {targetLanguage.name}</div>
    );
  };

  const playAgainBtn = () => {
    return <button onClick={playAgain}>Play again</button>;
  };

  const scoreboard = () => {
    return (
      <div>
        {score} out of {guesses} correct
      </div>
    );
  };

  return (
    <div className="App">
      {gamePhase === 0 && <div>Type something to translate into a random language:</div>}
      <input
        ref={inputRef}
        disabled={gamePhase > 0}
        type="text"
        value={inputText}
        onChange={(e) => {
          setGamePhase(0);
          setInputText(e.target.value);
        }}
      />
      {gamePhase < 1 && translateButton()}
      {gamePhase < 0 && (
        <div>That's already been translated - try something new!</div>
      )}
      {gamePhase > 0 && optionPanel()}
      {gamePhase === 1 && submitButton()}
      {gamePhase === 2 && resultMessage()}
      {gamePhase === 2 && playAgainBtn()}
      {guesses > 0 && scoreboard()}
      {loading && <div>loading</div>}
      <div style={{fontSize: '10px'}}>This app is under construction- will look better soon!</div>
    </div>
  );
}
