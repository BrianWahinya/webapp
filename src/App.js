// import logo from "./logo.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Footer, ErrorPage, WebArchiveIframe } from "./components";
import { Register } from "./entities";
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
  WorldStatistics,
  Calculator,
} from "./apps";

function App() {
  // Various route objects with their configs
  const appsRoutes = [
    {
      id: "worldstatistics",
      comp: <WorldStatistics />,
      path: "/app/worldstatistics",
    },
    {
      id: "conwaygameoflife",
      comp: <ConwayGameOfLife />,
      path: "/app/conwaygameoflife",
    },
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
    {
      id: "stopwatch",
      comp: <StopWatch />,
      path: "/app/stopwatch",
    },
    {
      id: "gallery",
      comp: <Gallery />,
      path: "/app/gallery",
    },
  ];

  return (
    <Router>
      <Navbar appsRoutes={appsRoutes} />
      <div className="content">
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
            element={<WebArchiveIframe archive="oldversion" scroll={true} />}
          />
          {appsRoutes.map((robj) => {
            const { id, path, comp } = robj;
            return <Route key={id} path={path} element={comp} />;
          })}
          <Route key="error" path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
