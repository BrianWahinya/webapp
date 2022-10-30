import { Link } from "react-router-dom";
import dims from "../../localdata/dims";
import "./css/breadcrumbs.css";

export default function Breadcrumbs({ crumbs }) {
  return (
    // <nav className="breadcrumbs" aria-label="breadcrumb">
    <ol className="breadcrumb">
      {crumbs.map((cm, idx) => {
        const { name, path } = dims[cm];
        if (idx !== crumbs.length - 1) {
          return (
            <li className="breadcrumb-link" key={name}>
              <Link to={path} className="breadcrumb-ahref notactive">
                {name}
              </Link>
            </li>
          );
        }
        return (
          <li
            className="breadcrumb-link last-link"
            aria-current="page"
            key={name}
          >
            <Link to={path} className="breadcrumb-ahref isactive">
              {name}
            </Link>
          </li>
        );
      })}
    </ol>
    // </nav>
  );
}
