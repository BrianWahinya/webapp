import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Clock from "./components/app_clock/clock";
import TaskManager from "./components/app_taskmanager/taskmanager";
import Weather from "./components/app_weather/weather";
import QouteGenerator from "./components/app_quotegenerator/quotegenerator";
import Movies from "./components/app_movies/movies";
import ErrorPage from "./components/errors/error_page";

function App() {
  // Various route objects with their configs
  const routesObj = [
    { id: "profile", comp: <Profile />, path: "/" },
    { id: "clock", comp: <Clock />, path: "/app/clock" },
    { id: "weather", comp: <Weather />, path: "/app/weather" },
    { id: "movies", comp: <Movies />, path: "/app/movies" },
    { id: "taskmanager", comp: <TaskManager />, path: "/app/taskmanager" },
    {
      id: "quotegenerator",
      comp: <QouteGenerator />,
      path: "/app/quotegenerator",
    },
  ];
  return (
    <div>
      <Router>
        <Navbar routesObj={routesObj} />
        <Routes>
          {routesObj.map((robj) => {
            const { id, path, comp } = robj;
            return <Route key={id} path={path} element={comp} />;
          })}
          <Route key="error" path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
