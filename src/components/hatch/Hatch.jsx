import { Card } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./hatch.css";

function Hatch({ number }) {
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClose = () => {
    setShow(false);
    setIsFlipped(false);
  };

  const handleShow = () => setShow(true);

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
          width: "80%",
          height: "80%",
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
          Welcome to hatch {number} !
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
