export default function SnakeMode({ error, playing, play, pause, restart }) {
  return (
    <div>
      {playing && !error && (
        <>
          <button className="btn btn-sm btn-outline-info pause" onClick={pause}>
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
        <button className="btn btn-sm btn-outline-success play" onClick={play}>
          Play
        </button>
      )}
      <br />
      {error && <p className="snakeError">Out of bounds!!!</p>}
    </div>
  );
}
