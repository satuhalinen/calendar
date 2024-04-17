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

  const hatchColor = useSelector(
    (state) => state.calendarStyling.selectedHatchColor
  );

  const hatchFontColor = useSelector(
    (state) => state.calendarStyling.selectedHatchFontColor
  );

  const hatchFont = useSelector((state) => state.calendarStyling.selectedFont);

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
          border: "none",
          width: "90%",
          height: "100%",
          backgroundColor: hatchColor,
          cursor: "pointer"
        }}
        className={`hatchCardUsed flip-card ${isFlipped ? "flipped" : ""}`}
      >
        <div className="hatch"
          style={{ color: hatchFontColor }}>{number}</div>
      </Card>
      <Modal className="hatchModal" centered show={show} onHide={handleClose}>
        <Modal.Header className="hatchModalContent text-center">
          <Modal.Title className="hatchModalTitle">{number}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="hatchModalContent" style={{ backgroundColor: "#FFFAF7" }}>
          <p style={{ fontFamily: hatchFont, color: hatchFontColor }}>
            {hatchTextHatch.content === undefined ||
              hatchTextHatch.content[number] === undefined
              ? "No content available"
              : hatchTextHatch.content[number]}
          </p>
        </Modal.Body>
        <Modal.Footer className="hatchModalContent" style={{ backgroundColor: "#FFFAF7", justifyContent: "center" }}>
          <Button
            className="hatchModalButton"
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
