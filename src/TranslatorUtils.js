// Import any necessary modules or constants here
const apiHeaders = {
  "content-type": "application/x-www-form-urlencoded",
  "X-RapidAPI-Key": process.env.REACT_APP_RapidAPI_Key,
  "X-RapidAPI-Host": "aibit-translator.p.rapidapi.com",
};

const callTranslate = (inputText, targetCode) => {
  const url = "https://aibit-translator.p.rapidapi.com/api/v1/translator/text";
  const options = {
    method: "POST",
    headers: apiHeaders,
    body: new URLSearchParams({
      from: "auto",
      to: targetCode,
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
  const url = "https://aibit-translator.p.rapidapi.com/api/v1/translator/support-languages";
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
