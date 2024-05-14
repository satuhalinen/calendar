import { useState, useEffect, useRef } from "react";
import { db } from "../../auth/firebase";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { Card, Col, Row, Table } from "react-bootstrap";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Chart from "chart.js/auto";
import '../adminpanel/adminpanel.css';
import MessageModal from "../../components/messageModal/MessageModal.jsx";
import { Link } from "react-router-dom";
import hatchData from '../../data/hatchData.json';

export default function Adminpanel() {
  const [submissions, setSubmissions] = useState([]);
  const [calendarCount, setCalendarCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const userChartRef = useRef(null);
  const submissionChartRef = useRef(null);
  const calendarChartRef = useRef(null);

  useEffect(() => {
    fetchSubmissions();
    fetchUsers();
    fetchCalendarCount();
    // addDataToFirebase();
  }, []);

  const addDataToFirebase = async () => {
    const batch = writeBatch(db);

    hatchData.categories.forEach(category => {
      const categoryRef = doc(db, 'categories', category.category);
      batch.set(categoryRef, { content: category.content });
    });

    await batch.commit();
    console.log('Data added to Firebase successfully!');
  };

  const fetchCalendarCount = async () => {
    try {
      const calendarCollectionRef = collection(db, 'calendars');
      const querySnapshot = await getDocs(calendarCollectionRef);
      const calendarData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCalendarCount(calendarData.length);
      createCalendarChart(calendarData.length);
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const contactFormsCollectionRef = collection(db, 'contactForms');
      const querySnapshot = await getDocs(contactFormsCollectionRef);
      const formData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(formData);
      createSubmissionChart(formData);
    } catch (error) {
      console.error('Error fetching contact forms:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userData);
      createUserChart(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUserChart = (userData) => {
    const adminCount = userData.filter(user => user.isAdmin).length;
    const userCount = userData.length - adminCount;

    const ctx = document.getElementById("userChart").getContext("2d");
    if (!userChartRef.current) {
      userChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Admin", "User"],
          datasets: [{
            label: "User Count",
            data: [adminCount, userCount],
            backgroundColor: ['#ba6c2c', '#dfcbbb'],
            borderWidth: 1,
            borderRadius: 5,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      userChartRef.current.data.datasets[0].data = [adminCount, userCount];
      userChartRef.current.update();
    }
  };

  const createSubmissionChart = (submissions) => {
    const submissionCount = submissions.length;

    const ctx = document.getElementById("submissionChart").getContext("2d");
    if (!submissionChartRef.current) {
      submissionChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Customer Messages Received"],
          datasets: [{
            label: "Forms Received",
            data: [submissionCount],
            backgroundColor: ['#4b5c59'],
            borderWidth: 1,
            borderRadius: 5,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      submissionChartRef.current.data.datasets[0].data = [submissionCount];
      submissionChartRef.current.update();
    }
  };

  const createCalendarChart = (calendarCount) => {
    const ctx = document.getElementById("calendarChart").getContext("2d");
    if (!calendarChartRef.current) {
      calendarChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Calendars"],
          datasets: [{
            label: "Calendars Created",
            data: [calendarCount],
            backgroundColor: ['#ba6c2c'],
            borderWidth: 1,
            borderRadius: 5,
          }]
        },
        options: {
          scales: {
            plugins: {
              legend: {
                display: false
              }
            }
          }
        }
      });
    } else {
      calendarChartRef.current.data.datasets[0].data = [calendarCount];
      calendarChartRef.current.update();
    }
  };

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Row className="mainContent dashboard-container">
      <Col xs={2} className="leftBarCol" >
        <Leftbar />
      </Col>
      <Col xs={10} className="dashboardCol">
        <h1 className="dashboardTitle">Dashboard</h1>
        <Row className="dataCards">
          <Col className="dataCardCol" xs={12} md={4}>
            <Card className="dataCard">
              <Card.Body className="dataCardBody">
                <canvas id="userChart" />
              </Card.Body>
            </Card>
          </Col>
          <Col className="dataCardCol" xs={12} md={4}>
            <Card className="dataCard">
              <Card.Body className="dataCardBody">
                <Card.Text>
                  <canvas id="submissionChart" />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="dataCardCol" xs={12} md={4}>
            <Card className="dataCard">
              <Card.Body className="dataCardBody">
                <Card.Text>
                  <canvas id="calendarChart"></canvas>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="users">
          <Col xs={12}>
            <Card className="usersCard">
              <Card.Header className="usersCardHeader">Users
                <Link to="/user-management" className="manageUsersLink">Manage Users</Link></Card.Header>
              <div className="tableWrapper">
                <Table className="usersTable" striped hover responsive>
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>User role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="contact-submissions">
          <Col xs={12}>
            <Card className="contactSubmissionsCard">
              <Card.Header className="contactSubmissionsCardHeader">Customer Messages
                <Link to="/customer-messages" className="manageUsersLink">See messages</Link></Card.Header>
              <div className="tableWrapper">
                <Table className="contactSubmissionsTable" striped hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id} onClick={() => handleOpenModal(submission)}>
                        <td>{submission.name}</td>
                        <td>{submission.email}</td>
                        <td>{submission.subject}</td>
                        <td className="contactFormMessage">{submission.message.length > 40 ? submission.message.slice(0, 50) + '...' : submission.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
        <MessageModal
          show={showModal}
          handleClose={handleCloseModal}
          message={selectedMessage}
        />
      </Col>
    </Row >
  );
}