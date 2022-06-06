import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faStackOverflow,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

export default function Footer() {
  const [year, setYear] = useState("");
  const socialMedia = [
    {
      name: "github",
      icon: faGithub,
      link: "https://github.com/BrianWahinya/webapp",
    },
    {
      name: "stackoverflow",
      icon: faStackOverflow,
      link: "https://stackoverflow.com/users/10642716/wahinya-brian",
    },
    {
      name: "linkedin",
      icon: faLinkedin,
      link: "https://www.linkedin.com/in/brian-wahinya-051b0b138/",
    },
    {
      name: "facebook",
      icon: faFacebook,
      link: "https://www.facebook.com/yobra.wahinya",
    },
  ];
  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    setYear(currentYear);
  }, []);
  return (
    <footer>
      {socialMedia.map((sm) => (
        <a
          key={sm.name}
          href={sm.link}
          className="socialMediaLinks"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon icon={sm.icon} />
        </a>
      ))}
      <p>{year} &copy; brianwahinya</p>
    </footer>
  );
}
