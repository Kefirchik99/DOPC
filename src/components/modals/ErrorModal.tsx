// ErrorModal.tsx
import { Modal, Button } from "react-bootstrap";

interface ErrorModalProps {
  show: boolean;
  onClose: () => void;
  message: string | null;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, onClose, message }) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Whoopsie</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ErrorModal;
