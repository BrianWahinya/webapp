import "./accordion-css/accordion.css";
export default function Education() {
  return (
    <div className="accordion" id="accordionEducation">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            2022 Sep: Masters Software Engineering
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionEducation"
        >
          <div className="accordion-body">
            <strong>Jomo Kenyatta University of Science and Technology</strong>
            <p>Details of the degree will appear here</p>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            2014 - 2018: BSc. Information Communication Technology
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionEducation"
        >
          <div className="accordion-body">
            <strong>Jaramogi Oginga Odinga University of Technology</strong>
            <p>Details of the degree will appear here</p>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            2021 March: Data Science, Artificial Intelligence and Machine
            Learning
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionEducation"
        >
          <div className="accordion-body">
            <strong>African Data School</strong>
            <p>Details of the degree will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
