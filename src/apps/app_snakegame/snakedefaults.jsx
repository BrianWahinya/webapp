export default function SnakeDefaults({
  score,
  changeCellSize,
  cellSize,
  speed,
}) {
  return (
    <>
      <div>
        <label htmlFor="cellSize">CellSize:</label>
        <select
          id="cellSize"
          name="cellSize"
          onChange={changeCellSize}
          value={cellSize}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
        &nbsp;&nbsp;
        <span>
          Speed:{" "}
          {
            {
              500: "Very Slow",
              400: "Slow",
              300: "Fast",
              200: "Very Fast",
              100: "Super-Fast",
            }[speed]
          }
        </span>
        &nbsp;&nbsp;
        <span>Score: {score}</span>
      </div>
    </>
  );
}
