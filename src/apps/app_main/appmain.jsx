export default function AppMain() {
  const apps = [
    { name: "snakegame", title: "Snake Game" },
    { name: "wordlegame", title: "Wordle Game" },
    { name: "weather", title: "Weather (API)" },
    { name: "movies", title: "Movies (API)" },
    { name: "clock", title: "Clock (Analog and Digital)" },
    { name: "taskmanager", title: "Task Manager" },
    { name: "stopwatch", title: "Stop Watch" },
    { name: "quotegenerator", title: "Quote Generator (API)" },
    { name: "rockpaperscissors", title: "Rock Paper Scissors" },
    { name: "conwaygameoflife", title: "Conway Game of Life" },
    { name: "statistics", title: "Statistics (World and Kenya)" },
    { name: "calculator", title: "Calculator" },
    { name: "gallery", title: "Gallery (API)" },
  ];
  return (
    <>
      <h3>Main App Page</h3>
      <h5>Projects: </h5>
      <ul>
        {apps.map((app) => (
          <li key={app.name}>{app.title}</li>
        ))}
      </ul>
    </>
  );
}
