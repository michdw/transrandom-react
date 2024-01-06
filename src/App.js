import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { translate, getLanguages } from "./TranslatorUtils";

export default function App() {
  //state
  const [inputText, setInputText] = useState("");
  const [allLanguages, setAllLanguages] = useState()
  const [indexes, setIndexes] = useState()
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
      getIndexes();
    } 
  }, [allLanguages]);

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
        setAllLanguages(response.data.languages)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getIndexes() {
    let arr = []
    for(let i = 0; i < optionCount; i++) {
      let n = Math.floor(Math.random() * allLanguages.length)
      arr.indexOf(n) == -1 && arr.push(n)
    }
    setIndexes(arr)
  }


  function printLanguages() {
    console.log(allLanguages)
  }

  function printOptionCount() {
    console.log(optionCount)
  }

  function printIndexes() {
    console.log(indexes)
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
        <button onClick={printLanguages}>print languages</button>
        <button onClick={printOptionCount}>print option count</button>
        <button onClick={printIndexes}>print indexes</button>
      </div>

    </div>
  );
}
