import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function EditTask({ task, editTask, icon, color }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setTitle(task.title);
    setDescription(task.description);
  };

  const changeListener = (event) => {
    const text = event.target.value;
    if (event.target.className === "edit_title") {
      setTitle(text);
    } else {
      setDescription(text);
    }
  };

  const updateListener = () => {
    if (title && description) {
      editTask({ id: task.id, title, description, color: task.color });
      toggle();
    }
  };

  return (
    <>
      <button
        className="btn btn-sm btn-outline btn-tasks-func"
        onClick={toggle}
        style={{ color: color, borderColor: color }}
      >
        {icon}
      </button>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
        <ModalBody>
          <input
            className="edit_title"
            placeholder="Title"
            value={title}
            onChange={changeListener}
          />
          <br />
          <textarea
            className="edit_description"
            placeholder="Description"
            value={description}
            onChange={changeListener}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateListener}>
            Update
          </Button>
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
