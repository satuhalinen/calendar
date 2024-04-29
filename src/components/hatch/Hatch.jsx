import { Card } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./hatch.css";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { auth } from "../../auth/firebase";
import { useParams } from "react-router-dom";
import { setScore, fetchScoreFromFirebase } from "../../store/scoreSlice";
import { useEffect } from "react";
import { getDoc } from "firebase/firestore";
import { setOpen } from "../../store/scoreSlice";
import { FaCheck } from "react-icons/fa";

function Hatch({ number }) {
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsFlipped(false);
    setIsOpened(true);
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

  const backgroundImg = useSelector(
    (state) => state.calendarStyling.selectedImage
  );

  const calendarBackgroundColor = useSelector(
    (state) => state.calendarStyling.selectedColor
  );

  const hatchFont = useSelector((state) => state.calendarStyling.selectedFont);

  useEffect(() => {
    const fetchScore = async () => {
      const currentUser = auth.currentUser;
      const calendarRef = doc(db, "calendars", id);
      const docSnap = await getDoc(calendarRef);
      const userData = docSnap.data().users[currentUser.uid];
      dispatch(fetchScoreFromFirebase(userData));
    };
    fetchScore();
  }, []);

  const { id } = useParams();

  const checkState =
    useSelector((state) => state.score[number]?.isChecked) || false;
  const isOpenedHatch =
    useSelector((state) => state.score[number]?.isOpened) || false;
  const handleClick = async () => {
    const currentUser = auth.currentUser;
    const calendarRef = doc(db, "calendars", id);
    let newCheckState;
    if (checkState === false) {
      newCheckState = true;
      dispatch(
        setScore({
          hatchNumber: number,
          isChecked: newCheckState,
        })
      );
    } else {
      newCheckState = false;
      dispatch(
        setScore({
          hatchNumber: number,
          isChecked: newCheckState,
        })
      );
    }

    await updateDoc(calendarRef, {
      [`users.${currentUser.uid}.${number}`]: {
        isChecked: newCheckState,
        isOpened: isOpenedHatch,
      },
    });
  };

  const cardClick = async () => {
    const currentUser = auth.currentUser;
    const calendarRef = doc(db, "calendars", id);
    let newOpenState = isOpenedHatch ? isOpenedHatch : true;
    if (!isOpenedHatch) {
      dispatch(setOpen({ hatchNumber: number, isOpened: newOpenState }));
    }
    await updateDoc(calendarRef, {
      [`users.${currentUser.uid}.${number}`]: {
        isChecked: checkState,
        isOpened: newOpenState,
      },
    });
  };

  return (
    <>
      <Card
        onClick={() => {
          handleShow();
          cardClick();
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
        className={`hatchCardUsed flip-card ${isFlipped ? "flipped" : ""} ${
          isOpened ? "opened" : ""
        }`}
      >
        <div
          className="hatch"
          style={{
            color: hatchFontColor,
            display: isFlipped || isOpened ? "none" : "",
          }}
        >
          {number}
        </div>
        {isOpenedHatch && !hatchTextHatch[number] && (
          <div className="hatchModalContent">
            <p className="noContentOpened" style={{ color: hatchFontColor }}>
              No content
            </p>
          </div>
        )}
        {isOpenedHatch && hatchTextHatch[number] && (
          <div
            className="hatchModalContent"
            style={{ background: hatchColor, color: hatchFontColor }}
          >
            <p className="hatchOpenedTitle">{hatchTextHatch[number].title}</p>
            <Image
              src={`https://source.unsplash.com/400x400/?${hatchTextHatch[number].title}`}
              roundedCircle
              className="hatchImage"
            />
            {checkState && <FaCheck className="checkMarkOpened" />}
          </div>
        )}
      </Card>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header
          className="hatchModalContent text-center"
          style={{
            background: backgroundImg
              ? `url(${backgroundImg})`
              : calendarBackgroundColor,
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
              {hatchTextHatch[number]
                ? hatchTextHatch[number].title
                : "No title"}
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
              checked={checkState}
              onChange={handleClick}
            />
            <span className="slider round"></span>
          </label>
        </Modal.Body>
        <Modal.Footer
          className="hatchModalContent"
          style={{
            backgroundColor: "#FFFAF7",
            justifyContent: "center",
            background: backgroundImg
              ? `url(${backgroundImg})`
              : calendarBackgroundColor,
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
      </Modal>
    </>
  );
}
export default Hatch;
