import { InputGroup, InputGroupText, Input } from "reactstrap";
import { Breadcrumbs, FaIcon, LocalCard } from "../../components";
import "./css/about.css";

const codingTools = [
  { id: "python", name: "Python" },
  { id: "js", name: "ES5, ES6+" },
  { id: "react", name: "React" },
  { id: "git", name: "Git" },
  { id: "sql", name: "Sql" },
  { id: "charts", name: "JsChartLibs" },
  { id: "docker", name: "Docker" },
  { id: "css", name: "Css/Sccs" },
  { id: "bootstrap", name: "Bootstrap" },
  { id: "html", name: "Html" },
  { id: "linux", name: "Linux-basics" },
];
export default function About() {
  const currentYear = new Date().getFullYear();
  const header = (yr) => (
    <>
      <InputGroup size="sm" width="xs">
        <InputGroupText>Experience</InputGroupText>
        <Input
          placeholder={`${yr - 2018}+ years`}
          value={`${yr - 2018}+ years`}
          disabled
        />
      </InputGroup>
      <InputGroup size="sm">
        <InputGroupText>Current Base</InputGroupText>
        <Input placeholder="Nairobi, Kenya" value="Nairobi, Kenya" disabled />
      </InputGroup>
      <InputGroup size="sm">
        <InputGroupText>Previous Locations</InputGroupText>
        <Input
          placeholder="Santiago and Bangkok"
          defaultValue="Santiago and Bangkok"
          disabled
        />
      </InputGroup>
    </>
  );

  const body = () => (
    <>
      <p>
        <u>Languages and tools</u>
      </p>
      <div className="codingToolsDiv">
        {codingTools.map((ct) => (
          <div key={ct.id} className="codingTool">
            <span id={`icon${ct.id}`} className="codingIcons">
              <FaIcon key={ct.id} name={ct.id} />
            </span>
            <p className="codingToolName">{ct.name}</p>
          </div>
        ))}
      </div>
    </>
  );
  return (
    <>
      <Breadcrumbs crumbs={["home", "about"]} />
      <div className="aboutDiv">
        <LocalCard header={header(currentYear)} body={body()} />
      </div>
    </>
  );
}
