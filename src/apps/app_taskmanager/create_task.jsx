import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { v4 as uuid } from "uuid";

export default function CreateTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => {
    if (modal === false) {
      setTitle("");
      setDescription("");
    }
    setModal(!modal);
  };

  const changeListener = (event) => {
    const text = event.target.value;
    if (event.target.className === "create_title") {
      setTitle(text);
    } else {
      setDescription(text);
    }
  };

  const genColor = () => {
    const randomBetween = (min, max) =>
      min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgb(${r},${g},${b})`;
  };

  const addListener = () => {
    if (title && description) {
      addTask({ id: uuid(), title, description, color: genColor() });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-info btn-sm btn-tasks"
        onClick={toggle}
      >
        Create Task
      </button>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
          <input
            className="create_title"
            placeholder="Title"
            value={title}
            onChange={changeListener}
          />
          <br />
          <textarea
            className="create_description"
            placeholder="Description"
            value={description}
            onChange={changeListener}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addListener}>
            Add
          </Button>{" "}
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
