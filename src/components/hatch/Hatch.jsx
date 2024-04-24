import { Card } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./hatch.css";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

function Hatch({ number, onCheck }) {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsFlipped(false);
    setIsOpened(true);
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

  const backgroundImg = useSelector(
    (state) => state.calendarStyling.selectedImage
  );

  const calendarBackgroundColor = useSelector(
    (state) => state.calendarStyling.selectedColor
  );

  const hatchFont = useSelector((state) => state.calendarStyling.selectedFont);

  return (
    <>
      <Card
        onClick={() => {
          handleShow();
          if (!isOpened) {
            setIsFlipped(true);
          }
        }}
        style={{
          border: "none",
          width: "90%",
          height: "100%",
          backgroundColor: hatchColor,
          cursor: "pointer",
        }}
        className={`hatchCardUsed flip-card ${isFlipped ? "flipped" : ""} ${isOpened ? "opened" : ""}`}
      >
        <div className="hatch" style={{ color: hatchFontColor, fontSize: isOpened ? "0.1rem" : "", display: isFlipped ? "none" : "" }}>
          {number}
        </div>
        {isOpened && !hatchTextHatch[number] && (
          <div className="hatchModalContent">
            <p className="noContentOpened"
              style={{ color: hatchFontColor }}>No content</p>
          </div>
        )}
        {isOpened && hatchTextHatch[number] && (
          <div className="hatchModalContent"
            style={{ background: hatchColor, color: hatchFontColor }}
          >
            <p className="hatchOpenedTitle">{hatchTextHatch[number].title}</p>
            <Image
              src={`https://source.unsplash.com/400x400/?${hatchTextHatch[number].title}`}
              roundedCircle
              className="hatchImage" />
            {isChecked && (
              <FaCheck className="checkMarkOpened" />
            )}
          </div>
        )}
      </Card >
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header
          className="hatchModalContent text-center"
          style={{
            background: backgroundImg ? `url(${backgroundImg})` : calendarBackgroundColor,
            backgroundSize: "cover",
          }}
        >
          <Modal.Title
            className="hatchModalTitle"
            style={{
              color: hatchFontColor,
            }}
          >
            {number}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="hatchModalContent"
          style={{
            backgroundColor: "#FFFAF7",
            background: hatchColor,
          }}
        >
          <div className="hatchModalContent">
            <p style={{ fontFamily: hatchFont, color: hatchFontColor }}>
              {hatchTextHatch[number] ? hatchTextHatch[number].title : "No title"}
            </p>
            <p style={{ fontFamily: hatchFont, color: hatchFontColor }}>
              {hatchTextHatch[number]
                ? hatchTextHatch[number].description
                : "No description"}
            </p>
          </div>
          <Container className="hatchModalContent">
            <Row>
              <Col>
                {hatchTextHatch[number] ? (
                  <Image
                    src={`https://source.unsplash.com/400x400/?${hatchTextHatch[number].title}`}
                    roundedCircle
                    className="hatchModalImage"
                  />
                ) : null}
              </Col>
            </Row>
          </Container>
          <p style={{ fontFamily: hatchFont, color: hatchFontColor }}>
            {hatchTextHatch[number] ? (
              <Button
                className="linkToHatchContent"
                variant="link"
                href={hatchTextHatch[number].link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: hatchFontColor }}
              >
                {hatchTextHatch[number].link}
              </Button>
            ) : (
              "No link"
            )}
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
        <Modal.Footer
          className="hatchModalContent"
          style={{
            backgroundColor: "#FFFAF7",
            justifyContent: "center",
            background: backgroundImg ? `url(${backgroundImg})` : calendarBackgroundColor,
            backgroundSize: "cover",
          }}
        >
          <Button
            className="hatchModalButton"
            onClick={handleClose}
            style={{ backgroundColor: hatchColor, color: hatchFontColor }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}
export default Hatch;
