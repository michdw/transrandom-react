import { React } from "react";
import githubIcon from "../assets/githubicon.png";
import reactIcon from "../assets/reacticon.png";

export default function Footer() {
  return (
    <section className="Footer">
      <div className="footer-item">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/michdw/transrandom-react"
        >
          <img className="footer-icon" src={githubIcon} alt="github icon" />
        </a>
      </div>
      <div className="footer-item">
        <img className="footer-icon" src={reactIcon} alt="react logo" />
        <span className="footer-text">
          Made with React by&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://michdw.github.io/portfolio/"
          >
            Michael D Weaver
          </a>
        </span>
      </div>
    </section>
  );
}
