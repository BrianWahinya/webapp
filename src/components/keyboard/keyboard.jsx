import "./keyboard.css";

export default function Keyboard() {
  const getChar = (e) => {
    console.log(e.target.id);
  };
  const genBtn = (lst) => {
    return (
      <>
        {lst.map((ls) => (
          <button
            key={ls}
            id={ls}
            className="btn btn-sm btn-primary keys"
            onClick={getChar}
            disabled
          >
            {ls}
          </button>
        ))}
      </>
    );
  };
  return (
    <div className="keyboard">
      <code>
        On-Screen-Keyboard
        <br />
        (Coding in progress)
        <br />
        Coming soon!!!
      </code>
      <div className="keysGrid">
        <div className="rows row1">
          {genBtn(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"])}
        </div>
        <div className="rows row2">
          {genBtn(["a", "s", "d", "f", "g", "h", "j", "k", "l"])}
        </div>
        <div className="rows row3">
          {genBtn(["z", "x", "c", "v", "b", "n", "m"])}
        </div>
      </div>
    </div>
  );
}
