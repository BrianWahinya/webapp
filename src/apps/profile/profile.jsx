import Typed from "react-typed";
import "./profile.css";

export default function Profile() {
  return (
    <div className="profileDiv">
      <Typed
        strings={["I'm Brian Wahinya", "I'm a Software Engineer"]}
        loop={true}
        typeSpeed={100}
        backSpeed={100}
        backDelay={40}
        smartBackspace={true}
      />
    </div>
  );
}
