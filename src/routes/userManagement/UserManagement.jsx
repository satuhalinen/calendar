import { useState, useEffect } from "react";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { auth, db } from "../../auth/firebase";
import { Row, Col, Form, Table } from "react-bootstrap";
import './userManagement.css';
import Leftbar from "../../components/leftbar/Leftbar";
import UserModal from "../../components/userModal/UserModal";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersCollectionRef = collection(db, 'users');
            let queryRef = usersCollectionRef;

            if (roleFilter) {
                queryRef = query(usersCollectionRef, where("role", "==", roleFilter));
            }

            const querySnapshot = await getDocs(queryRef);
            const userData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilter = (e) => {
        setRoleFilter(e.target.value);
    };
    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(auth.currentUser);

            await deleteDoc(doc(db, "users", userId));

            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleOpenUserModal = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const handleCloseUserModal = () => {
        setShowUserModal(false);
    };

    const filteredUsers = users.filter((user) =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Row className="mainContent userManagementWrap">
            <Col xs={2} className="leftBarCol">
                <Leftbar />
            </Col>
            <Col xs={10}>
                <div className="userManagementContainer">
                    <h5 className="userManagementTitle">User Management</h5>
                    <Row className="searchAndFilter">
                        <Col>
                            <Form.Group controlId="searchTerm">
                                <Form.Control
                                    className="usersSearchInput"
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchTerm}
                                    onChange={handleSearch} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="roleFilter">
                                <Form.Control
                                    className="usersFilterSelect"
                                    as="select"
                                    value={roleFilter}
                                    onChange={handleFilter}>
                                    <option value="">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="userManagementTableWrapper">
                        <Table striped bordered hover responsive className="userManagementTable">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Manage User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers
                                    .filter(user => {
                                        if (roleFilter === 'admin') {
                                            return user.isAdmin;
                                        } else if (roleFilter === 'user') {
                                            return !user.isAdmin;
                                        }
                                        return true;
                                    })
                                    .map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                                            <td className="detailsColumn">
                                                <button className="userDetailsButton" onClick={() => handleOpenUserModal(user)}>Manage User</button>
                                            </td></tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Col>
            <UserModal
                user={selectedUser}
                show={showUserModal}
                handleClose={handleCloseUserModal}
                handleDelete={handleDeleteUser}
            />
        </Row>
    );
}

export default UserManagement;