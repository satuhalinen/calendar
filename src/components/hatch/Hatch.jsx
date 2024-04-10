import { Card } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./hatch.css";
import { useSelector } from "react-redux";

function Hatch({ number }) {
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClose = () => {
    setShow(false);
    setIsFlipped(false);
  };

  const handleShow = () => setShow(true);

  const hatchTextHatch = useSelector(
    (state) => state.alternatives.calendarText
  );

  return (
    <>
      <Card
        onClick={() => {
          if (!isFlipped) {
            setIsFlipped(true);
            handleShow();
          }
        }}
        style={{
          border: "1px solid black",
          width: "70%",
          height: "70%",
        }}
        className={`flip-card ${isFlipped ? "flipped" : ""}`}
      >
        <div className="hatch">{number}</div>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#FFFAF7" }}>
          <Modal.Title>{number}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#FFFAF7" }}>
          {hatchTextHatch.content === undefined ||
          hatchTextHatch.content[number] === undefined
            ? "No content available"
            : hatchTextHatch.content[number]}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FFFAF7" }}>
          <Button
            style={{
              backgroundColor: "#cbd6d5",
              border: "none",
              color: "black",
            }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Hatch;
