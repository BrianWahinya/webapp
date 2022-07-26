import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

export default function Navbar({ appsRoutes }) {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <div className="mainContent">
          <a className="navbar-brand" href="/">
            <FontAwesomeIcon icon={faHouseChimneyUser} />
          </a>
          <p className="comingSoon">Coming Soon &#128521;</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse text-right"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
              >
                Versions
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="nav-item">
                  <a
                    href={`${window.location.origin}/archives/current`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Current Web-Version
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="" href="/maiden">
                    Maiden Web-Version
                  </a>
                </li> */}
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
              >
                Mini-Apps
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {appsRoutes.map((appRoute) => {
                  const { id, path } = appRoute;
                  return (
                    <li key={id}>
                      <Link to={path}>{id}</Link>
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
