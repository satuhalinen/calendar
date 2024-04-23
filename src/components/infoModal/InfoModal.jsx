import { Modal, Button } from 'react-bootstrap'
import './infoModal.css'

const InfoModal = ({ show, handleClose }) => {
    return (
        <Modal centered show={show} onHide={handleClose} className="messageModal">
            <Modal.Header className="infoModalHeader">
                <Modal.Title className="infoModalTitle">Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className="infoModalBody">
                <p><strong>Here information about using the calendar</strong></p>
            </Modal.Body>
            <Modal.Footer className="infoModalFooter">
                <Button variant="secondary" className="infoModalButton" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InfoModal