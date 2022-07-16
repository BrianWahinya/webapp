export default function SnakeDefaults({
  score,
  play,
  pause,
  restart,
  changeCellSize,
  cellSize,
  error,
  playing,
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
        &nbsp;
        <span>Score: {score}</span>
      </div>
      <div>
        {playing && !error && (
          <>
            <button
              className="btn btn-sm btn-outline-info pause"
              onClick={pause}
            >
              Pause
            </button>
          </>
        )}
        {(playing || error) && (
          <button
            className="btn btn-sm btn-outline-secondary restart"
            onClick={restart}
          >
            Restart
          </button>
        )}
        {!playing && !error && (
          <button
            className="btn btn-sm btn-outline-success play"
            onClick={play}
          >
            Play
          </button>
        )}
        <br />
        {error && <p className="snakeError">Out of bounds!!!</p>}
      </div>
    </>
  );
}
