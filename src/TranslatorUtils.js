// Import any necessary modules or constants here
const apiHeaders = {
  "content-type": "application/x-www-form-urlencoded",
  "X-RapidAPI-Key": "c170c8462dmshe05678b2397b2dfp1fcae3jsn638e4f1e2659",
  "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
};

const callTranslate = (inputText, targetCode) => {
  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: apiHeaders,
    body: new URLSearchParams({
      source_language: "auto",
      target_language: targetCode,
      text: String(inputText),
    }),
  };
  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

const callGetLanguages = () => {
  const url = "https://text-translator2.p.rapidapi.com/getLanguages";
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
