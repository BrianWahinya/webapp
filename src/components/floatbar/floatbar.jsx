import { useState } from "react";
import { Link } from "react-router-dom";
import { FaIcon } from "..";
import "./floatbar.css";

const semibars = [
  { name: "about", txt: "About Me", link: "/about" },
  { name: "cv", txt: "Resume", link: "/resume" },
  { name: "apps", txt: "MiniApps", link: "/app" },
  { name: "projects", txt: "Projects", link: "/projects" },
  { name: "contact", txt: "Contact", link: "/contact" },
];
export default function FloatBar() {
  const [isOpen, setIsOpen] = useState(true);
  const openBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="floatbar">
      <div className="semibar">
        {semibars.map((sm) => (
          <Link key={sm.name} to={sm.link}>
            <div
              className={`floatIconsDiv ${isOpen ? "openItems" : "closeItems"}`}
            >
              <FaIcon name={sm.name} />
              <p className="txt">{sm.txt}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="floatIconsDiv toggleItems" onClick={openBar}>
        {isOpen ? <FaIcon name="gears" /> : <FaIcon name="code" />}
      </div>
    </div>
  );
}
