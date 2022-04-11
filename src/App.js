// import logo from "./logo.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import AppMain from "./components/app_main/appmain";
import Clock from "./components/app_clock/clock";
import TaskManager from "./components/app_taskmanager/taskmanager";
import Weather from "./components/app_weather/weather";
import QouteGenerator from "./components/app_quotegenerator/quotegenerator";
import Movies from "./components/app_movies/movies";
import ErrorPage from "./components/errors/error_page";
import Footer from "./components/footer/footer";

function App() {
  // Various route objects with their configs
  const routesObj = [
    { id: "clock", comp: <Clock />, path: "/app/clock" },
    { id: "weather", comp: <Weather />, path: "/app/weather" },
    { id: "movies", comp: <Movies />, path: "/app/movies" },
    { id: "taskmanager", comp: <TaskManager />, path: "/app/taskmanager" },
    { id: "taskmanager1", comp: <TaskManager />, path: "/app/taskmanager" },
    { id: "taskmanager2", comp: <TaskManager />, path: "/app/taskmanager" },
    { id: "taskmanager3", comp: <TaskManager />, path: "/app/taskmanager" },
    {
      id: "quotegenerator",
      comp: <QouteGenerator />,
      path: "quotegenerator",
    },
  ];
  return (
    <Router>
      <Navbar routesObj={routesObj} />
      <Routes>
        <Route key="profile" path="/" element={<Profile />} />
        <Route key="app" path="app" element={<AppMain />} />
        {routesObj.map((robj) => {
          const { id, path, comp } = robj;
          return <Route key={id} path={path} element={comp} />;
        })}
        <Route key="error" path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
