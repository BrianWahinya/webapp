import "./accordion-css/accordion.css";
const eduInfo = [
  {
    id: "mse",
    date: "2022 Sep",
    title: "Masters Software Engineering",
    subtitle: "Jomo Kenyatta University of Science and Technology",
    details: "Details of the degree will appear here",
  },
  {
    id: "dsm",
    date: "2021 March",
    title: "Data Science, Artificial Intelligence and Machine Learning",
    subtitle: "African Data School",
    details: "Details of the degree will appear here",
  },
  {
    id: "ict",
    date: "2014 - 2018",
    title: "BSc. Information Communication Technology",
    subtitle: "Jaramogi Oginga Odinga University of Technology",
    details: "Details of the degree will appear here",
  },
];
export default function Education() {
  return (
    <div className="accordion" id="accordionEducation">
      {eduInfo.map((info, idx) => {
        const { id, date, title, subtitle, details } = info;
        return (
          <div key={id} className="accordion-item">
            <h2 className="accordion-header" id={`heading${idx}`}>
              <button
                className={`accordion-button ${idx !== 4 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${idx}`}
                aria-expanded={`${idx === 0 ? "true" : "false"}`}
                aria-controls={`collapse${idx}`}
              >
                {date}:<br /> {title}
              </button>
            </h2>
            <div
              id={`collapse${idx}`}
              className={`accordion-collapse collapse ${
                idx === 4 ? "show" : ""
              }`}
              aria-labelledby={`heading${idx}`}
              data-bs-parent="#accordionEducation"
            >
              <div className="accordion-body">
                <strong>{subtitle}</strong>
                <p>{details}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
