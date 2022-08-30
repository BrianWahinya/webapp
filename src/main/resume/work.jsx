import "./timeline-css/timeline.css";
const workInfo = [
  {
    date: "2021-2022",
    job: "Software Developer",
    company: "United Nations",
    description: "The description will be here",
  },
  {
    date: "2019-2021",
    job: "Full-Stack Developer",
    company: "United Nations",
    description: "The description will be here",
  },
  {
    date: "2018-2019",
    job: "Front-End Developer",
    company: "United Nations",
    description: "The description will be here",
  },
  {
    date: "2017 Feb - 2017 May",
    job: "Front-End Developer",
    company: "United Nations",
    description: "The description will be here",
  },
];
export default function Work() {
  return (
    <div class="timeline">
      {workInfo.map((wi, idx) => {
        const ps = idx % 2 === 0 ? "left" : "right";
        return (
          <div class={`tm-container ${ps}`}>
            <div class="tm-content">
              <h5>{wi.job}</h5>
              <h5>{wi.company}</h5>
              <p>{wi.date}</p>
              <p>{wi.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
