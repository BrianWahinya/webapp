import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ routesObj }) {
  return (
    <nav>
      <a href="/">Profile</a>
      <a href="https://brianwahinya.com" target="_blank">
        Current Web-Version
      </a>
      <a href="https://brianwahinya.com" target="_blank">
        Maiden Web-Version
      </a>
      {routesObj.map((robj) => {
        const { id, path } = robj;
        return (
          <Link key={id} to={path}>
            {id}
          </Link>
        );
      })}
    </nav>
  );
}
