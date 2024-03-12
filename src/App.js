/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { callTranslate, callGetLanguages } from "./TranslatorUtils";

export default function App() {
  //state
  const [allLanguages, setAllLanguages] = useState();
  const [optionCount] = useState(5);
  const [languageOptions, setLanguageOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [targetLanguage, setTargetLanguage] = useState();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [gameStage, setGameStage] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(Boolean);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pastInputs, setPastInputs] = useState([]);

  const dataFetchedRef = useRef(false);
  const inputRef = useRef(null);

  //get languages on load

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleGetLanguages();
  }, []);

  const handleGetLanguages = () => {
    callGetLanguages()
      .then((response) => {
        response = response.slice(1);
        console.log(response);
        setAllLanguages(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //translate sequence

  // useEffect(() => {
  //   if(pastInputs.length > 0) {
  //     console.log(pastInputs);
  //     getLanguageOptions();
  //   }
  // }, [])

  useEffect(() => {
    if (languageOptions) {
      // console.log(languageOptions);
      getTargetLanguage();
    }
  }, [languageOptions]);

  useEffect(() => {
    if (targetLanguage) {
      // console.log(targetLanguage);
      handleTranslate();
    }
  }, [targetLanguage]);

  function submitText() {
    for(let i = 0; i < pastInputs.length; i++) {
      if(inputText === pastInputs[i]) {
        console.log("already used this");
        ///
      }
    }
    setPastInputs(prevPastInputs => [...prevPastInputs, inputText]);
    getLanguageOptions();
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
        console.log(response);
        let comparativeText = response.trans.toLowerCase();
        if (inputText.toLowerCase() === comparativeText) {
          // if output text is identical to input text, reassign the target language and re-translate
          getTargetLanguage();
        } else {
          setLoading(false);
          setGameStage(1);
          setOutputText(response.trans);
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
    setGameStage(2);
    setAnswerCorrect(
      selectedOption.code === targetLanguage.code ? true : false
    );
    setGuesses((prevGuesses) => prevGuesses + 1);
  }

  function playAgain() {
    setGameStage(0);
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
        disabled={inputText.length < 2 || gameStage !== 0}
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
        </div>
        <ul>
          {languageOptions &&
            languageOptions.map((option) => (
              <div key={option.code}>
                <input
                  disabled={gameStage !== 1}
                  type="radio"
                  name="languageOption"
                  value={option.language}
                  onClick={() => selectOption(option)}
                />
                <label htmlFor={option.language}>{option.language}</label>
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
      <div>sorry, the correct answer was {targetLanguage.language}</div>
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
      {gameStage === 0 && <div>Type anything to translate:</div>}
      <input
        ref={inputRef}
        disabled={gameStage > 0}
        type="text"
        value={inputText}
        onChange={(e) => {
          setGameStage(0);
          setInputText(e.target.value);
        }}
      />
      {gameStage < 1 && translateButton()}
      {gameStage > 0 && optionPanel()}
      {gameStage === 1 && submitButton()}
      {gameStage === 2 && resultMessage()}
      {gameStage === 2 && playAgainBtn()}
      {guesses > 0 && scoreboard()}
      {loading && <div>loading</div>}
    </div>
  );
}
