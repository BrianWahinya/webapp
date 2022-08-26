import Typed from "react-typed";
import "./profile.css";

const txtLines = ["I'm Brian Wahinya", "I'm a Software Engineer"];
export default function Profile() {
  return (
    <div className="profileDiv">
      <Typed
        strings={txtLines}
        loop={true}
        typeSpeed={100}
        backSpeed={50}
        backDelay={1000}
        smartBackspace={true}
      />
    </div>
  );
}
