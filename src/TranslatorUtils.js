// Import any necessary modules or constants here
const apiHeaders = {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": process.env.REACT_APP_RapidAPI_Key,
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  };
  
  const translate = (inputText, targetCode) => {
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
  
  const getLanguages = () => {
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
  
  export { translate, getLanguages };
