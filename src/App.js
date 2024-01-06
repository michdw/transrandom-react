import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { translate, getLanguages } from "./TranslatorUtils";

export default function App() {
  //state
  const [inputText, setInputText] = useState("");
  const [allLanguages, setAllLanguages] = useState()
  const [options, setOptions] = useState()
  const [optionCount, setOptionCount] = useState(5)

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
    translate(inputText, selectTargetLanguage().code)
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
        setAllLanguages(response.data.languages)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //

  function getOptions() {
    let indexes = []
    while(indexes.length < optionCount) {
      let n = Math.floor(Math.random() * allLanguages.length)
      indexes.indexOf(n) === -1 && indexes.push(n)
    }
    let objects = []
    for(let i = 0; i < optionCount; i++) {
      let j = indexes[i]
      objects.push(allLanguages[j])
    }
    setOptions(objects)
  }

  function selectTargetLanguage() {
    let i = Math.floor(Math.random() * options.length)
    return options[i]
  }


  function printOptions() {
    console.log(options)
  }


  return (
    <div className="App">
      
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleTranslate}>Click to translate</button>

      <div>
        <button onClick={printOptions}>print options</button>
      </div>

    </div>
  );
}
