// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import comingSoonPic from "./assets/images/comingsoon.jpg";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Footer, ErrorPage, WebArchiveIframe } from "./components";
import { Register } from "./entities";
import { About, Resume, Projects, Contact } from "./main";
import {
  Profile,
  AppMain,
  Clock,
  Weather,
  Movies,
  TaskManager,
  QouteGenerator,
  RockPaperScissors,
  ConwayGameOfLife,
  StopWatch,
  Gallery,
  Statistics,
  Calculator,
  Wordle,
  Snakegame,
  Concepts,
} from "./apps";
import FloatBar from "./components/floatbar/floatbar";

function App() {
  // Various route objects with their configs
  const appsRoutes = [
    { id: "about", comp: <About />, path: "/about" },
    { id: "resume", comp: <Resume />, path: "/resume" },
    { id: "projects", comp: <Projects />, path: "/projects" },
    { id: "contact", comp: <Contact />, path: "/contact" },
    { id: "statistics", comp: <Statistics />, path: "/app/statistics" },
    {
      id: "conwaygameoflife",
      comp: <ConwayGameOfLife />,
      path: "/app/conwaygameoflife",
    },
    { id: "wordle-game", comp: <Wordle />, path: "/app/wordle" },
    { id: "snake-game", comp: <Snakegame />, path: "/app/snakegame" },
    { id: "coding-concepts", comp: <Concepts />, path: "/app/concepts" },
    { id: "calculator", comp: <Calculator />, path: "/app/calculator" },
    { id: "clock", comp: <Clock />, path: "/app/clock" },
    { id: "weather", comp: <Weather />, path: "/app/weather" },
    { id: "movies", comp: <Movies />, path: "/app/movies" },
    { id: "taskmanager", comp: <TaskManager />, path: "/app/taskmanager" },
    {
      id: "quotegenerator",
      comp: <QouteGenerator />,
      path: "/app/quotegenerator",
    },
    {
      id: "rockpaperscissors",
      comp: <RockPaperScissors />,
      path: "/app/rockpaperscissors",
    },
    { id: "stopwatch", comp: <StopWatch />, path: "/app/stopwatch" },
    { id: "gallery", comp: <Gallery />, path: "/app/gallery" },
  ];

  return (
    <Router>
      <Navbar appsRoutes={appsRoutes} />
      <div
        className="content"
        style={{ backgroundImage: `url("${comingSoonPic}")` }}
      >
        <div className="subcontent">
          <FloatBar />
          <div className="subdiv">
            <Routes>
              <Route key="profile" path="/" element={<Profile />} />
              <Route key="app" path="app" element={<AppMain />} />
              <Route key="register" path="register" element={<Register />} />
              <Route
                key="current"
                path="current"
                element={<WebArchiveIframe archive="current" scroll="no" />}
              />
              <Route
                key="maiden"
                path="maiden"
                element={
                  <WebArchiveIframe archive="oldversion" scroll={true} />
                }
              />
              {appsRoutes.map((robj) => {
                const { id, path, comp } = robj;
                return <Route key={id} path={path} element={comp} />;
              })}
              <Route key="error" path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
