import { Link } from "react-router-dom";

export default function Navbar({ routesObj }) {
  return (
    <>
      <h5>Navbar App</h5>
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
    </>
  );
}
