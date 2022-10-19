import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// General
import {
  faHouseChimneyUser,
  faCubesStacked,
  faUserSecret,
  faNewspaper,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAddressCard,
  faMosquito,
  faGear,
  faGears,
  faCode,
  faDiagramProject,
  faGraduationCap,
  faPersonDigging,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faOpencart,
  faStudiovinari,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

// Mini-Apps
import {
  faLaptopCode,
  faRodSnake,
  faBuilding,
  faCloudSunRain,
  faClock,
  faStopwatch,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCommentDots,
  faVideo,
  faCalculator,
  faImages,
  faChartLine,
  faChessBoard,
  faListCheck,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

// Brands
import {
  faPython,
  faJs,
  faNodeJs,
  faReact,
  faHtml5,
  faSass,
  faGithub,
  faDocker,
  faLinux,
  faBootstrap,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faChartColumn } from "@fortawesome/free-solid-svg-icons";

const icons = {
  home: faStudiovinari,
  apps: faCubesStacked,
  about: faUserSecret,
  cv: faNewspaper,
  projects: faDiagramProject,
  contact: faAddressCard,
  gears: faGears,
  code: faMosquito,
  education: faGraduationCap,
  work: faPersonDigging,
  whatsapp: faWhatsapp,
  email: faEnvelope,
  mailbox: faPaperPlane,
  delete: faTrashCan,
  moreinfo: faCircleInfo,

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

  python: faPython,
  js: faJs,
  node: faNodeJs,
  sql: faDatabase,
  react: faReact,
  html: faHtml5,
  css: faSass,
  git: faGithub,
  charts: faChartColumn,
  docker: faDocker,
  linux: faLinux,
  bootstrap: faBootstrap,
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
