import { React } from "react";

export default function LanguageOption(props) {

  function selectThis() {
    if (props.gamePhase === 2) {
      props.selectOption(props.option);
    }
  }

  return (
    <li
      className="language-option"
      key={props.option.code}
    >
        <input
          id={props.option.code}
          disabled={props.gamePhase !== 2}
          type="radio"
          name="languageOption"
          value={props.option.name}
          className={props.gamePhase === 2 ? "active-radio" : null}
          onClick={() => {
            selectThis();
          }}
        />
        <label
          htmlFor={props.option.code}
          className={props.gamePhase === 2 ? "active-radioLabel" : null}
          onClick={() => {
            selectThis();
          }}
        >
          {props.option.name}
        </label>
    </li>
  );
}
