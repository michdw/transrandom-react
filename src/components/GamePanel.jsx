/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css";
import React, { useEffect, useState, useRef } from "react";
import { callTranslate } from "../TranslatorUtils";
import { supportedLanguages } from "../LanguageList";
import sendicon from "../assets/sendicon.png";

export default function GamePanel(props) {
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
      } else {
        setGamePhase(1);
      }
    }
    if (isNew) {
      setPastInputs((prevPastInputs) => [...prevPastInputs, inputText]);
      getLanguageOptions();
    }
  }

  function getLanguageOptions() {
    let indexes = [];
    while (indexes.length < props.optionCount) {
      let n = Math.floor(Math.random() * allLanguages.length);
      indexes.indexOf(n) === -1 && indexes.push(n);
    }
    let objects = [];
    for (let i = 0; i < props.optionCount; i++) {
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
          setGamePhase(2);
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
    setGamePhase(3);
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

  const sendIcon = () => {
    return (
      <span className="sendicon">
        <img src={sendicon} alt="SendIcon" />
      </span>
    );
  };

  const userInput = () => {
    return (
      <input
        className={gamePhase > 0 ? "bubble recipient" : "bubble prompt"}
        ref={inputRef}
        disabled={gamePhase > 0}
        type="text"
        placeholder="..."
        value={inputText}
        onChange={(e) => {
          setGamePhase(0);
          setInputText(e.target.value);
        }}
      />
    );
  };

  const translateButton = () => {
    return (
      <div
        className="prompt-row"
        onClick={submitText}
      >
        <button className="bubble prompt" disabled={gamePhase !== 0}>
          Click to translate
        </button>
        {sendIcon()}
      </div>
    );
  };

  const optionPanel = () => {
    return (
      <section className="optionPanel">
        {!loading && (
          <div className="bubble recipient output-text">{outputText}</div>
        )}
        <ul className="radioContainer bubble sender">
          <p>What language is this?</p>
          {languageOptions &&
            languageOptions.map((option) => (
              <li key={option.code}>
                <input
                  disabled={gamePhase !== 2}
                  type="radio"
                  name="languageOption"
                  value={option.name}
                  onClick={() => selectOption(option)}
                />
                <label htmlFor={option.name}>{option.name}</label>
              </li>
            ))}
        </ul>
      </section>
    );
  };

  const submitButton = () => {
    return (
      <div
        className="prompt-row"
        hidden={!selectedOption}
        onClick={() => submitGuess(selectedOption)}
      >
        <button className="bubble prompt" type="submit">
          Submit guess
        </button>
        {sendIcon()}
      </div>
    );
  };

  const resultMessage = () => {
    return (
      <div className="bubble sender">
        {answerCorrect && <span>correct!</span>}
        {!answerCorrect && (
          <span>sorry, the correct answer was {targetLanguage.name}</span>
        )}
      </div>
    );
  };

  const playAgainBtn = () => {
    return (
      <div className="prompt-row" onClick={playAgain}>
        <button className="bubble prompt">Play again</button>
        {sendIcon()}
      </div>
    );
  };

  const scoreboard = () => {
    return (
      <div>
        {score} out of {guesses} correct
      </div>
    );
  };

  return (
    <section className="GamePanel">
      <div className="bubble sender">
        Type something to translate into a random language:
      </div>
      {gamePhase < 0 && (
        <div className="bubble sender">
          That's already been translated - try something new!
        </div>
      )}
      {gamePhase < 1 && userInput()}
      {gamePhase < 1 && inputText.length > 1 && translateButton()}
      {gamePhase > 0 && optionPanel()}
      {gamePhase === 2 && selectedOption && submitButton()}
      {gamePhase === 3 && (
        <div className="bubble recipient">{selectedOption.name}</div>
      )}
      {gamePhase === 3 && resultMessage()}
      {gamePhase === 3 && playAgainBtn()}
      {guesses > 0 && scoreboard()}
      {loading && <div className="spinner">文</div>}
    </section>
  );
}
