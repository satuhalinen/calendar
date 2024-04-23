import { Card } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./hatch.css";
import { useSelector } from "react-redux";

function Hatch({ number, onCheck }) {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClose = () => {
    setShow(false);
    setIsFlipped(false);
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
    onCheck(number, !isChecked);
  }

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

  const calendarBackgroundColor = useSelector(
    (state) => state.calendarStyling.selectedColor
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
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header className="hatchModalContent text-center"
          style={{ background: calendarBackgroundColor }}>
          <Modal.Title className="hatchModalTitle"
            style={{ color: hatchColor }}>{number}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="hatchModalContent" style={{ backgroundColor: "#FFFAF7", background: calendarBackgroundColor }}>
          <p style={{ fontFamily: hatchFont, color: hatchFontColor }}>
            {hatchTextHatch[number] ? hatchTextHatch[number] : "No content"}
          </p>
          <label className="toggle-btn">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheck}
            />
            <span className="slider round"></span>
          </label>
        </Modal.Body>
        <Modal.Footer className="hatchModalContent" style={{ backgroundColor: "#FFFAF7", justifyContent: "center", background: calendarBackgroundColor }}>
          <Button
            className="hatchModalButton"
            onClick={handleClose}
            style={{ backgroundColor: hatchColor, color: hatchFontColor }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Hatch;
