import { Modal } from 'react-bootstrap';
import './messageModal.css';

const MessageModal = ({ show, handleClose, message }) => {
    if (!message || !message.subject) {
        return null;
    }
    return (
        <Modal className="messageModal" show={show} onHide={handleClose} >
            <Modal.Header className="messageModalHeader">
                <Modal.Title className='messageModalTitle'>{message.subject}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="messageModalBody">
                <p><strong>Name:</strong> {message.name}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Message:</strong> {message.message}</p>
            </Modal.Body>
            <Modal.Footer className="messageModalFooter">
                <button className="messageModalButton" onClick={handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default MessageModal;
