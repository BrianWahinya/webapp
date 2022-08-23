import { useState } from "react";
import { FaIcon } from "..";
import "./floatbar.css";

export default function FloatBar() {
  const [isOpen, setIsOpen] = useState(false);
  const openBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="floatbar">
      <div className="semibar">
        <div className={`floatIconsDiv ${isOpen ? "openItems" : "closeItems"}`}>
          <FaIcon name="about" />
          <p className="txt">About Me</p>
        </div>
        <div className={`floatIconsDiv ${isOpen ? "openItems" : "closeItems"}`}>
          <FaIcon name="cv" />
          <p className="txt">Resume</p>
        </div>
        <div className={`floatIconsDiv ${isOpen ? "openItems" : "closeItems"}`}>
          <FaIcon name="apps" />
          <p className="txt">Mini-apps</p>
        </div>
        <div className={`floatIconsDiv ${isOpen ? "openItems" : "closeItems"}`}>
          <FaIcon name="projects" />
          <p className="txt">Projects</p>
        </div>
        <div className={`floatIconsDiv ${isOpen ? "openItems" : "closeItems"}`}>
          <FaIcon name="contact" />
          <p className="txt">Contact</p>
        </div>
      </div>
      <div className="floatIconsDiv toggleItems" onClick={openBar}>
        {isOpen ? <FaIcon name="gears" /> : <FaIcon name="code" />}
      </div>
    </div>
  );
}
