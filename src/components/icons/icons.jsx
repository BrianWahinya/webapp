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
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
const icons = {
  home: faHouseChimneyUser,
  apps: faCubesStacked,
  about: faUserSecret,
  cv: faNewspaper,
  projects: faDiagramProject,
  contact: faAddressCard,
  gears: faGears,
  code: faLaptopCode,
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
