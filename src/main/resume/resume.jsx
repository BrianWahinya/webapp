import { FaIcon } from "../../components";
import Education from "./education";
import "./resume.css";

export default function Resume() {
  return (
    <div>
      <h5>Resume</h5>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-edu-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-edu"
            type="button"
            role="tab"
            aria-controls="nav-edu"
            aria-selected="true"
          >
            <FaIcon name="education" />
            <br />
            Education
          </button>
          <button
            className="nav-link"
            id="nav-work-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-work"
            type="button"
            role="tab"
            aria-controls="nav-work"
            aria-selected="false"
          >
            <FaIcon name="work" />
            <br />
            Work Experience
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-edu"
          role="tabpanel"
          aria-labelledby="nav-edu-tab"
        >
          {/* Education */}
          <Education />
          {/* Education End */}
        </div>
        <div
          className="tab-pane fade"
          id="nav-work"
          role="tabpanel"
          aria-labelledby="nav-work-tab"
        >
          This will display work-experience details
        </div>
      </div>
    </div>
  );
}
