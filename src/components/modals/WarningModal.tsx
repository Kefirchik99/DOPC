import React from "react";
import { Modal, Button } from "react-bootstrap";

interface WarningModalProps {
  show: boolean;
  onClose: () => void;
  message: string | null; 
}

const WarningModal: React.FC<WarningModalProps> = ({ show, onClose, message }) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Warning</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onClose}>
        OK
      </Button>
    </Modal.Footer>
  </Modal>
);

export default WarningModal;
