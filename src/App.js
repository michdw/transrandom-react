import "./App.css";
import React, { useEffect, useState } from "react";
import { translate, getLanguages } from "./TranslatorUtils";

export default function App() {
  //state
  const [inputText, setInputText] = useState("");

  const dataFetchedRef = React.useRef(false);

  //api
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleGetLanguages();
  }, []);


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
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleTranslate}>Click to translate</button>

    </div>
  );
}
