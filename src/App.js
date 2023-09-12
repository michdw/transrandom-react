import "./App.css";

function App() {
  const translate = () => {
    console.log(process.env.NODE_ENV)
    console.log(process.env.REACT_APP_RapidAPI_Key)
    console.log(process.env.REACT_APP_test)
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
        target_language: "id",
        text: "What is your name?",
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
      <p onClick={translate}>click here</p>
    </div>
  );
}

export default App;
