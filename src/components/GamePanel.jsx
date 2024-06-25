/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css";
import React, { useEffect, useState, useRef } from "react";
import { callTranslate } from "../TranslatorUtils";
import { supportedLanguages } from "../LanguageList";
import sendicon from "../assets/sendicon.png";
import LanguageOption from "./LanguageOption";

export default function GamePanel(props) {
  const allLanguages = getAllLanguages();

  //state for each round
  const [languageOptions, setLanguageOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [targetLanguage, setTargetLanguage] = useState();
  const [loading, setLoading] = useState(false);
  const [fixedLetter, setFixedLetter] = useState(randomLetter());
  const [inputText, setInputText] = useState(fixedLetter);
  const [outputText, setOutputText] = useState("");
  const [gamePhase, setGamePhase] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(Boolean);

  //state for whole game
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);

  //
  const inputRef = useRef(null);

  useEffect(() => {
    setInputText(fixedLetter);
  }, [fixedLetter]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [languageOptions]);

  function getAllLanguages() {
    let arr = [];
    for (let l in supportedLanguages) {
      l !== "Auto Detect" &&
        l !== "English" &&
        arr.push({ code: supportedLanguages[l], name: l });
    }
    return arr;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function randomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  // user input functions

  function handleFixedLetterInput(e) {
    const newValue = e.target.value;
    if (newValue.startsWith(fixedLetter)) {
      setInputText(newValue);
    } else {
      setInputText(fixedLetter + newValue.slice(1));
    }
  }

  function limitSelection(e) {
    let startPos = e.target.selectionStart;
    let endPos = e.target.selectionEnd;
    if (startPos === 0) {
      startPos === endPos
        ? e.target.setSelectionRange(1, 1)
        : e.target.setSelectionRange(1, endPos);
    }
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
    setGamePhase(1);
    getLanguageOptions();
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

  function submitGuess(selectedOption) {
    setGamePhase(3);
    setAnswerCorrect(
      selectedOption.code === targetLanguage.code ? true : false
    );
    setGuesses((prevGuesses) => prevGuesses + 1);
    sleep(200).then(() => {
      setGamePhase(4);
    });
  }

  function playAgain() {
    setLanguageOptions(null);
    setSelectedOption(null);
    setTargetLanguage(null);
    setLoading(false);
    setFixedLetter(randomLetter());
    setOutputText("");
    setGamePhase(0);
    setAnswerCorrect(null);
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
        ref={inputRef}
        className={gamePhase > 0 ? "bubble recipient" : "bubble prompt"}
        disabled={gamePhase > 0}
        type="text"
        value={inputText}
        onClick={(e) => {
          limitSelection(e);
        }}
        onKeyUp={(e) => {
          limitSelection(e);
        }}
        onChange={(e) => {
          setInputText(e.target.value);
          handleFixedLetterInput(e);
        }}
      />
    );
  };

  const translateButton = () => {
    return (
      <div className="prompt-row" onClick={submitText}>
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
              <LanguageOption option={option} gamePhase={gamePhase} selectOption={() => setSelectedOption(option)}/>
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
          <span>
            sorry, the correct answer was <strong>{targetLanguage.name}</strong>
          </span>
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
      <div className="bubble sender init">
        Type something in English, beginning with the letter {fixedLetter}:
      </div>
      {gamePhase === 0 && userInput()}
      {gamePhase === 0 && inputText.length > 1 && translateButton()}
      {gamePhase > 0 && <div className="bubble recipient">{inputText}</div>}
      {gamePhase > 1 && optionPanel()}
      {gamePhase === 2 && selectedOption && submitButton()}
      {gamePhase > 2 && (
        <div className="bubble recipient">{selectedOption.name}</div>
      )}
      {gamePhase === 4 && resultMessage()}
      {gamePhase === 4 && playAgainBtn()}
      {guesses > 0 && scoreboard()}
      {loading && <div className="spinner">文</div>}
    </section>
  );
}
