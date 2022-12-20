import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  CardFooter,
  CardText,
} from "reactstrap";
import "./css/card.css";

const LocalCard = ({ header, body, footer }) => {
  return (
    <Card
      className="my-2"
      style={{
        width: "",
      }}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody>{body}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default LocalCard;
