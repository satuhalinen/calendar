import { Card, Col, Row, Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import useCalendarData from "../../hooks/useCalendarData";
import { useState } from "react";
import "../adminCalendars/adminCalendars.css";
import "../adminpanel/adminpanel.css";
import Spinner from "react-bootstrap/Spinner";
import { LuMinusCircle } from "react-icons/lu";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { getDoc, getDocs, collection } from "firebase/firestore";

export default function AdminCalendars() {
  const [removed, setRemoved] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [calendarToDelete, setCalendarToDelete] = useState(null);
  const { loading, calendars, intersectionObserverRef } =
    useCalendarData(removed);
  const [search, setSearch] = useState("");

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const removeCalendarClick = async () => {
    if (calendarToDelete) {
      try {
        const calendarRef = doc(db, "calendars", calendarToDelete);
        await deleteDoc(calendarRef);
        setRemoved(!removed);
        await removeMyCalendarFromAllUsers(calendarToDelete);
        handleCloseRemoveModal();
      } catch (error) {
        console.error('Error deleting calendar:', error);
      }
    }
  };

  const removeMyCalendarFromAllUsers = async (calendarId) => {
    const usersSnap = await getDocs(collection(db, "users"));
    usersSnap.forEach(async (userDoc) => {
      const myCalendarRef = doc(
        db,
        "users",
        userDoc.id,
        "myCalendars",
        calendarId
      );
      try {
        const myCalendarSnap = await getDoc(myCalendarRef);
        if (myCalendarSnap.exists()) {
          await deleteDoc(myCalendarRef);
        }
      } catch (error) {
        console.error('Error deleting calendar:', error);
      }
    });
  };

  const handleShowRemoveModal = (id) => {
    setCalendarToDelete(id);
    setShowRemoveModal(true);
  };

  const handleCloseRemoveModal = () => {
    setShowRemoveModal(false);
    setCalendarToDelete(null);
  };

  return (
    <Row className="mainContent adminCalendarsContainer">
      <Col xs={2} className="leftBarCol">
        <Leftbar />
      </Col>
      <Col xs={9} className="adminCalendars">
        <p className="adminCalendarTitle">Calendars</p>
        <div className="search-input">
          <input
            type="text"
            className="search-field"
            placeholder="Search By Title"
            onChange={searchHandler}
          />
        </div>

        {loading ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <div className="adminCalendarCards">
            {calendars
              .filter((calendarItem) =>
                calendarItem.calendarTitle
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((calendar) => (
                <Card
                  key={calendar.id}
                  className="calendarCard d-flex flex-column justify-content-center align-items-center"
                  data-calendar-id={calendar.id}
                  ref={(calendarRef) =>
                    calendarRef &&
                    intersectionObserverRef.current &&
                    intersectionObserverRef.current.observe(calendarRef)
                  }
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center adminCalendarBody">
                    <Card.Title className="calendarCardTitle">
                      {calendar.calendarTitle}
                    </Card.Title>
                    <NavLink
                      to={`/calendar/${calendar.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Img
                        src={calendar.imageUrl || defaultScreenshot}
                        data-src={calendar.imageUrl}
                        className="calendarScreenShot"
                      />
                    </NavLink>
                  </Card.Body>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                    <NavLink
                      to={`/calendar/${calendar.id}`}
                      className="modifyButton btn btn-secondary"
                    >
                      Use
                    </NavLink>
                    <NavLink
                      to={`/modify-old-calendar-styling/${calendar.id}`}
                      className="modifyButton btn btn-secondary"
                    >
                      Modify
                    </NavLink>
                    <button
                      className="removeCalendarButton"
                      onClick={() => handleShowRemoveModal(calendar.id)}
                      style={{
                        backgroundColor: "#BA6C2C",
                        border: "none",
                        color: "#F4EDE7",
                        height: "52%",
                      }}
                    >
                      <LuMinusCircle className="removeCalendarIcon" />
                    </button>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </Col>
      <Modal
        className="removeModal"
        centered
        show={showRemoveModal}
        onHide={handleCloseRemoveModal}
      >
        <Modal.Header className="removeModalHeader">
          <Modal.Title className="removeModalTitle">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="removeModalBody">
          <strong>
            <p>Are you sure you want to delete this calendar?</p>
          </strong>
          <p>Deleting this calendar will permanently remove all data. </p>
        </Modal.Body>
        <Modal.Footer className="removeModalFooter">
          <Button
            className="deleteRemoveModalButton"
            variant="danger"
            onClick={removeCalendarClick}
          >
            Delete
          </Button>
          <Button
            className="removeModalButton"
            variant="secondary"
            onClick={handleCloseRemoveModal}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}