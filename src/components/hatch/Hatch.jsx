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

import { query, collection, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { saveToMyCalendar } from "../../store/scoreSlice";
import { resetState } from "../../store/scoreSlice";

import { doesSectionFormatHaveLeadingZeros } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";


function Hatch({ number, saveMyCalendarsClick }) {
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedBackground, setselectedBackground] = useState(null);
  const dispatch = useDispatch();

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

  const backgroundImg = useSelector(
    (state) => state.calendarStyling.selectedImage
  );

  const calendarBackgroundColor = useSelector(
    (state) => state.calendarStyling.selectedColor
  );

  const uploadedImage = useSelector(
    (state) => state.calendarStyling.uploadedImage
  );

  const hatchFont = useSelector((state) => state.calendarStyling.selectedFont);

  const calendarSave = useSelector(
    (state) => state.score?.startedUsing || false
  );

  const [user] = useAuthState(auth);

  const checkIfStartedUsing = async () => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const document = querySnapshot.docs[0];
    const docId = document.id;
    const calendarRef = doc(db, "users", docId, "myCalendars", id);
    const docSnap = await getDoc(calendarRef);
    const userData = docSnap.data();
    const startedUsing = userData?.startedUsing || false;
    dispatch(saveToMyCalendar(startedUsing));
  };
  useEffect(() => {

    checkIfStartedUsing();

    if (backgroundImg) {
      setselectedBackground('backgroundImage');
    } else if (calendarBackgroundColor) {
      setselectedBackground('color');
    } else if (uploadedImage) {
      setselectedBackground('uploadedImage');
    }
  }, [backgroundImg, calendarBackgroundColor, uploadedImage]);

  const determineBackground = () => {
    if (selectedBackground === 'backgroundImage') {
      return `url(${backgroundImg})`;
    } else if (selectedBackground === 'color') {
      return calendarBackgroundColor;
    } else if (selectedBackground === 'uploadedImage') {
      return `url(${uploadedImage})`;
    } else {
      return calendarBackgroundColor;
    }
  };
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

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {

    if (calendarSave) {
      const fetchScore = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const document = querySnapshot.docs[0];
        const docId = document.id;
        const calendarRef = doc(db, "users", docId, "myCalendars", id);
        const docSnap = await getDoc(calendarRef);
        const userData = docSnap.data();
        dispatch(fetchScoreFromFirebase(userData));
      };
      fetchScore();
    }

  }, [saveMyCalendarsClick, calendarSave]);

  const { id } = useParams();
  const hatches = useSelector((state) => state.score.hatches) || {};
  const checkState = hatches[number]?.isChecked || false;
  const isOpenedHatch = hatches[number]?.isOpened || false;

  const handleClick = async () => {
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

    if (calendarSave) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const document = querySnapshot.docs[0];
      const docId = document.id;
      const calendarRef = doc(db, "users", docId, "myCalendars", id);
      await updateDoc(calendarRef, {
        startedUsing: true,
        [`hatches.${number}`]: {
          isChecked: newCheckState,
          isOpened: isOpenedHatch,
        },
      });
    }
  };

  const cardClick = async () => {
    if (calendarSave) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const document = querySnapshot.docs[0];
      const docId = document.id;
      const calendarRef = doc(db, "users", docId, "myCalendars", id);
      await updateDoc(calendarRef, {
        startedUsing: true,
      });
    }
    let newOpenState = isOpenedHatch ? isOpenedHatch : true;
    if (!isOpenedHatch) {
      dispatch(setOpen({ hatchNumber: number, isOpened: newOpenState }));
    }
  };

  return (
    <>
      <Card
        onClick={() => {
          handleShow();
          cardClick();
          if (!isOpenedHatch) {
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
        className={`hatchCardUsed flip-card ${isFlipped ? "flipped" : ""} ${isOpenedHatch ? "opened" : ""
          }`}
      >
        <div
          className="hatch"
          style={{
            color: hatchFontColor,
            display: isFlipped || isOpenedHatch ? "none" : "",
          }}
        >
          {number}
        </div>
        {isOpenedHatch && !hatchTextHatch[number] && (
          <div className="hatchModalContent">
            <p className="noContentOpened" style={{ color: isFlipped ? hatchColor : hatchFontColor }}>
              No content
            </p>
          </div>
        )}
        {isOpenedHatch && hatchTextHatch[number] && (
          <div
            className="hatchModalContent"
            style={{ display: isFlipped ? "none" : "", background: hatchColor, color: hatchFontColor }}
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
            background: determineBackground(),
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
            background: determineBackground(),
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
