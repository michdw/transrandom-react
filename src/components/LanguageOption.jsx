import { React } from "react";

export default function LanguageOption(props) {
  return (
    <li
      className="language-option"
      key={props.option.code}
      onClick={() => {
        if (props.gamePhase === 2) {
          props.selectOption(props.option);
        }
      }}
      style={{ cursor: props.gamePhase === 2 ? "pointer" : "not-allowed" }}
    >
      <input
        id={props.option.code}
        disabled={props.gamePhase !== 2}
        type="radio"
        name="languageOption"
        value={props.option.name}
        className={props.gamePhase === 2 && "active-radio"}
      />
      <label
        htmlFor={props.option.code}
        className={props.gamePhase === 2 && "active-radioLabel"}
      >
        {props.option.name}
      </label>
    </li>
  );
}
