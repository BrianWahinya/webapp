import comingSoonPic from "../../assets/images/comingsoon.jpg";
import "./profile.css";

export default function Profile() {
  return (
    <div
      className="bgimg"
      style={{ backgroundImage: `url("${comingSoonPic}")` }}
    >
      {/* <h5>Profile page</h5>
      <p>
        This project involves creating a new personal portfolio and at the same
        time building small programming projects.
        <br />
        This is the 3rd portfolio version meant to replace the{" "}
        <a
          target="_blank"
          hint="Stack Exchange Profile"
          href={`${window.location.origin}/archives/current`}
        >
          current-portfolio
        </a>
        .
      </p>
      <p>Contents on this page will be: Resume and About me</p>
      <a
        href="https://stackexchange.com/users/14736994/wahinya-brian"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src="https://stackexchange.com/users/flair/14736994.png"
          width="208"
          height="58"
          alt="Stack Exchange Profile"
          title="Stack Exchange Profile"
        />
      </a> */}

      <div className="topleft">
        <p>Brian</p>
      </div>
      <div className="middle">
        {/* <h1>COMING SOON</h1> */}

        <p>A few days left...</p>
        <hr />
        <a
          href={`${window.location.origin}/archives/current`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Go to the current version
        </a>
      </div>
    </div>
  );
}
