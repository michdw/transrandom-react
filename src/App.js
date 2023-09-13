import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("")


  const translate = () => {
    console.log(inputText)
    const url = "https://text-translator2.p.rapidapi.com/translate";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.REACT_APP_RapidAPI_Key,
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: new URLSearchParams({
        source_language: "en",
        target_language: "ru",
        text: String(inputText),
      }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
      <button onClick={translate}>Click to translate</button>
    </div>
  );
}

export default App;
