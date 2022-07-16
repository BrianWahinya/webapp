export default function SnakeCanvas({ canvasRef, height, width, error }) {
  return (
    <>
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        className={error ? "canvasError" : "canvas"}
      />
    </>
  );
}
