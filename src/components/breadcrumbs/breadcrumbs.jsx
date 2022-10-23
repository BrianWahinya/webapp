import { Link } from "react-router-dom";
import dims from "../../localdata/dims";
import "./css/breadcrumbs.css";

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav className="navBreadcrumbs" aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbs.map((cm, idx) => {
          const { name, path } = dims[cm];
          if (idx !== crumbs.length - 1) {
            return (
              <li className="breadcrumb-item" key={name}>
                <Link to={path}>{name}</Link>
              </li>
            );
          }
          return (
            <li
              className="breadcrumb-item active"
              aria-current="page"
              key={name}
            >
              {name}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
