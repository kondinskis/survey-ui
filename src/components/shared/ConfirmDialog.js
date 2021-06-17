import React from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmDialog = ({ onClose, message, args }) => {
  const msg = () => {
    if (message) {
      return message.replace(/{(\d)}/g, (_, $1) => {
        return `<span class="text-danger font-italic">${args[$1]}</span>`;
      });
    }
    return "Are you sure?";
  };

  return (
    <Modal isOpen toggle={() => onClose(false)} centered={true} size={"sm"}>
      <ModalHeader toggle={() => onClose(false)}>Confirmation</ModalHeader>
      <ModalBody dangerouslySetInnerHTML={{ __html: msg() }}></ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => onClose(false)}>
          Cancel
        </Button>

        <Button color="success" onClick={() => onClose(true)}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDialog;
