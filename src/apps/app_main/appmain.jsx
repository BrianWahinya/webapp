import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./css/main.css";
import { FaIcon } from "../../components";
export default function AppMain() {
  const apps = [
    {
      name: "snakegame",
      title: "Snake Game",
      path: "snakegame",
      icon: "snake",
    },
    {
      name: "wordlegame",
      title: "Wordle Game",
      path: "wordle",
      icon: "wordle",
    },
    {
      name: "weather",
      title: "Weather",
      path: "weather",
      icon: "weather",
    },
    { name: "movies", title: "Movies", path: "movies", icon: "movies" },
    {
      name: "clock",
      title: "Clock",
      path: "clock",
      icon: "clock",
    },
    {
      name: "taskmanager",
      title: "Task Manager",
      path: "taskmanager",
      icon: "taskmanager",
    },
    {
      name: "stopwatch",
      title: "Stop Watch",
      path: "stopwatch",
      icon: "stopwatch",
    },
    {
      name: "quotegenerator",
      title: "Quote Generator",
      path: "quotegenerator",
      icon: "quotes",
    },
    {
      name: "rockpaperscissors",
      title: "Rock Paper Scissors",
      path: "rockpaperscissors",
      icon: "rockpaperscissors",
    },
    {
      name: "conwaygameoflife",
      title: "Conway Game of Life",
      path: "conwaygameoflife",
      icon: "conway",
    },
    {
      name: "codingconcepts",
      title: "Coding concepts",
      path: "concepts",
      icon: "coding",
    },
    {
      name: "statistics",
      title: "Statistics",
      path: "statistics",
      icon: "statistics",
    },
    {
      name: "calculator",
      title: "Calculator",
      path: "calculator",
      icon: "calculator",
    },
    {
      name: "gallery",
      title: "Gallery",
      path: "gallery",
      icon: "gallery",
    },
  ];
  return (
    <>
      <h5>Mini-Apps: </h5>
      <code>Still in coding &amp; design stages</code>
      <p>
        These are small applications I have always wanted to do
        <br /> I constantly review them to improve their codebase and design
        <br /> Each is either simple or complex
      </p>
      <div className="divMainApps">
        {apps.map((app) => (
          <Link to={`/app/${app.path}`} className="appLink" key={app.name}>
            <span className="appIcon">
              <FaIcon name={app.icon} />
            </span>{" "}
            <br />
            {app.title}
          </Link>
        ))}
      </div>
    </>
  );
}
