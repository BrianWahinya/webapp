import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ routesObj }) {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Profile
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-right"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Versions
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="nav-item">
                  <a
                    className=""
                    href="https://brianwebportal.netlify.app/"
                    target="_blank"
                  >
                    Current Web-Version
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className=""
                    href="https://brianwebportal.netlify.app/"
                    target="_blank"
                  >
                    Maiden Web-Version
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Apps
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {routesObj.map((robj) => {
                  const { id, path } = robj;
                  return (
                    <li>
                      <Link key={id} to={path}>
                        {id}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
