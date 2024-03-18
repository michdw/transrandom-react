// Import any necessary modules or constants here
const apiHeaders = {
  "content-type": "application/json",
  "X-RapidAPI-Key": process.env.REACT_APP_RapidAPI_Key,
  "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
};

const callTranslate = (inputText, targetCode) => {
  const url = "https://translate-plus.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify({
      text: inputText,
      source: "auto",
      target: targetCode
    }),
  };
  
  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

const callGetLanguages = () => {
  const url = "https://translate-plus.p.rapidapi.com/";
  const options = {
    method: "GET",
    headers: apiHeaders,
  };
  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

export { callTranslate, callGetLanguages };
