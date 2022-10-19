import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./modal.css";

const CustomModal = ({ openModal, seeMore, modalContentCss, args }) => {
  const { title, body, bodyStyle } = modalContentCss;
  const toggle = () => seeMore();
  return (
    <div>
      <Modal isOpen={openModal} toggle={toggle} {...args}>
        <div style={bodyStyle} className={bodyStyle ? "bgImgDiv" : ""}>
          <ModalHeader toggle={toggle} charcode="X">
            <div className={bodyStyle ? "bgImgHeader" : ""}>{title}</div>
          </ModalHeader>
          <ModalBody>
            <div className={bodyStyle ? "bgImgBody" : ""}>{body}</div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};
export default CustomModal;
