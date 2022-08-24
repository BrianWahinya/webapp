import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import { faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faRodSnake } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
const icons = {
  home: faHouseChimneyUser,
  apps: faCubesStacked,
  about: faUserSecret,
  cv: faNewspaper,
  projects: faDiagramProject,
  contact: faAddressCard,
  gears: faGears,
  code: faCode,

  weather: faCloudSunRain,
  wordle: faBuilding,
  snake: faRodSnake,
  clock: faClock,
  stopwatch: faStopwatch,
  quotes: faCommentDots,
  movies: faVideo,
  calculator: faCalculator,
  gallery: faImages,
  statistics: faChartLine,
  conway: faChessBoard,
  taskmanager: faListCheck,
  rockpaperscissors: faScissors,
  coding: faLaptopCode,
};

const spinning = ["gears"];

export default function FaIcon({ name }) {
  return (
    <FontAwesomeIcon
      icon={icons[name]}
      spin={spinning.includes(name) ? true : false}
    />
  );
}
