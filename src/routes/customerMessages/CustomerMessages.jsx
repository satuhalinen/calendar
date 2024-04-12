import { useState, useEffect } from "react";
import { db } from "../../auth/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Col, Row, Table, Form } from "react-bootstrap";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import MessageModal from "../../components/messageModal/MessageModal.jsx";
import "./customerMessages.css";

export default function CustomerMessages() {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCriteria, setFilterCriteria] = useState("");

    useEffect(() => {
        fetchSubmissions();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [submissions, searchTerm, filterCriteria]);

    const fetchSubmissions = async () => {
        try {
            const contactFormsCollectionRef = collection(db, 'contactForms');
            const querySnapshot = await getDocs(contactFormsCollectionRef);
            const formData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setSubmissions(formData);
        } catch (error) {
            console.error('Error fetching contact forms:', error);
        }
    };

    const applyFilter = () => {
        let filteredData = submissions;

        if (searchTerm) {
            filteredData = filteredData.filter(submission => {
                const searchFields = ['name', 'email', 'subject'];
                return searchFields.some(field => submission[field]?.toLowerCase().includes(searchTerm.toLowerCase()));
            });
        }

        if (filterCriteria) {
            filteredData = filteredData.filter(submission => submission[filterCriteria]?.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredSubmissions(filteredData);
    };

    const handleOpenModal = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterCriteria(event.target.value);
    };

    return (
        <Row className="mainContent">
            <Col xs={2} className="leftBarCol">
                <Leftbar />
            </Col>
            <Col xs={10} className="customerMessagesContainer">
                <h1 className="customerMessagesTitle dashboardTitle">Customer Messages</h1>
                <Row className="searchAndFilterContainer">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            className="customerSearchInput"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            as="select"
                            className="customerFilterSelect"
                            value={filterCriteria}
                            onChange={handleFilterChange}
                        >
                            <option value="">Filter by...</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="subject">Subject</option>
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className="customerMessagesTableWrapper">
                            <Table className="customerMessagesTable" striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSubmissions.map((submission) => (
                                        <tr key={submission.id} onClick={() => handleOpenModal(submission)}>
                                            <td>{submission.name}</td>
                                            <td>{submission.email}</td>
                                            <td>{submission.subject}</td>
                                            <td className="customerMessage">{submission.message.length > 40 ? submission.message.slice(0, 50) + '...' : submission.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <MessageModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    message={selectedMessage}
                />
            </Col>
        </Row>
    );
}