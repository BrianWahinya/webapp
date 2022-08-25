import { FaIcon } from "../../components";
import "./about.css";

const codingTools = [
  { id: "python", name: "Python" },
  { id: "js", name: "Javascript ES5, ES6+" },
  { id: "react", name: "React" },
  { id: "css", name: "Css/Sass/Sccs" },
  { id: "git", name: "Git" },
  { id: "sql", name: "Sql" },
  { id: "charts", name: "JsChartLibs" },
  { id: "docker", name: "Docker" },
  { id: "html", name: "Html" },
];
export default function About() {
  return (
    <div>
      <h5>About Me</h5>
      <p>
        6+ yrs in software design and development. Currently based in Nairobi,
        Kenya.
      </p>
      <p>
        <u>Languages and tools</u>
      </p>
      <div className="codingToolsDiv">
        {codingTools.map((ct) => (
          <div className="codingTool">
            <span id={`icon${ct.id}`} className="codingIcons">
              <FaIcon key={ct.id} name={ct.id} />
            </span>
            <p className="codingToolName">{ct.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
