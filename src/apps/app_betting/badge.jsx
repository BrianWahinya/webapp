export default function Badge({ name }) {
  switch (name) {
    case "win":
      return <span className={`badge bg-primary`}>win</span>;
    case "draw":
      return <span className={`badge bg-warning`}>draw</span>;
    case "lose":
      return <span className={`badge bg-dark`}>lose</span>;
    default:
      return <span className={`badge bg-info`}>undecided</span>;
  }
}
