import { React } from "react";
import githubIcon from "../assets/githubicon.png";
import reactIcon from "../assets/reacticon.png";

export default function Header() {
  return (
    <section className="Header">
      <a href="https://github.com/michdw/transrandom-react">
        <img className="header-icon" src={githubIcon} alt="github icon" />
      </a>
      <img className="header-icon" src={reactIcon} alt="react logo" />
      <span className="header-text">
        Made with React by{" "}
        <a href="https://michdw.github.io/portfolio/">Michael D Weaver</a>
      </span>
    </section>
  );
}
