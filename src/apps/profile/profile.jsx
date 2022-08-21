import comingSoonPic from "../../assets/images/comingsoon.jpg";
import { FaIcon } from "../../components";
import "./profile.css";

export default function Profile() {
  return (
    <div
      className="bgimg"
      style={{ backgroundImage: `url("${comingSoonPic}")` }}
    >
      <div className="topleft">
        <p>Brian</p>
      </div>
      <div className="middle">
        <div className="profile-icons position1">
          <FaIcon name="about" />
          <span className="txt">About Me</span>
        </div>
        <div className="profile-icons position2">
          <FaIcon name="cv" />
          <span className="txt">Resume</span>
        </div>
        <div className="profile-icons position3">
          <FaIcon name="apps" />
          <span className="txt">Mini-apps</span>
        </div>
        <div className="profile-icons position4">
          <FaIcon name="projects" />
          <span className="txt">Projects</span>
        </div>
        <div className="profile-icons position5">
          <FaIcon name="contact" />
          <span className="txt">Contact</span>
        </div>
        {/* <p>A few days left...</p>
        <hr />
        <a
          href={`${window.location.origin}/archives/current`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Go to the current version
        </a> */}
      </div>
    </div>
  );
}
