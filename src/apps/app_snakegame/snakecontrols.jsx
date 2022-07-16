export default function SnakeControls({ getControl, playing }) {
  return (
    <>
      <div className="up">
        <button
          className="btn btn-sm btn-warning snakeControls"
          onClick={getControl}
          id="upleft"
          disabled={!playing}
        >
          &#8598;
        </button>
        <button
          className="btn btn-sm btn-primary snakeControls"
          onClick={getControl}
          id="up"
          disabled={!playing}
        >
          &#8593;
        </button>
        <button
          className="btn btn-sm btn-warning snakeControls"
          onClick={getControl}
          id="upright"
          disabled={!playing}
        >
          &#8599;
        </button>
      </div>
      <div className="left-right">
        <button
          className="btn btn-sm btn-info snakeControls"
          onClick={getControl}
          id="left"
          disabled={!playing}
        >
          &#8592;
        </button>
        <button
          className="btn btn-sm btn-info snakeControls"
          onClick={getControl}
          id="right"
          disabled={!playing}
        >
          &#8594;
        </button>
      </div>
      <div className="down">
        <button
          className="btn btn-sm btn-warning snakeControls"
          onClick={getControl}
          id="downleft"
          disabled={!playing}
        >
          &#8601;
        </button>
        <button
          className="btn btn-sm btn-primary snakeControls"
          onClick={getControl}
          id="down"
          disabled={!playing}
        >
          &#8595;
        </button>
        <button
          className="btn btn-sm btn-warning snakeControls"
          onClick={getControl}
          id="downright"
          disabled={!playing}
        >
          &#8600;
        </button>
      </div>
    </>
  );
}
