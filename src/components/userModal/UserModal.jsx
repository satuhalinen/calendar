import { Modal, Button } from "react-bootstrap";
import { auth } from "../../auth/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import "./userModal.css";

function UserModal({ user, show, handleClose, handleDelete }) {
    if (!user) return null;

    const { id, fullname, email, isAdmin } = user;

    const onDeleteUser = async (userId) => {
        try {
            await handleDelete(userId);
            handleClose();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const onResetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error('Error sending password reset email:', error);
        }
    };

    return (
        <Modal centered show={show} onHide={handleClose} className="messageModal">
            <Modal.Header className="messageModalHeader">
                <Modal.Title className="messageModalTitle">Manage User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="messageModalBody">
                <p><strong>User ID: </strong>{id}</p>
                <p><strong>Name: </strong>{fullname}</p>
                <p><strong>Email</strong> {email}</p>
                <p><strong>Role:</strong> {isAdmin ? 'Admin' : 'User'}</p>
            </Modal.Body>
            <Modal.Footer className="messageModalFooter">
                <Button variant="danger" className="deleteUserModalButton" onClick={() => onDeleteUser(id)}>
                    Delete User
                </Button>
                <Button variant="secondary" className="resetPasswordButton" onClick={() => onResetPassword(email)}>
                    Reset Password
                </Button>
                <Button variant="secondary" className="messageModalButton" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserModal;