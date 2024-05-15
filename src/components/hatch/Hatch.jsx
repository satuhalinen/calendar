import {
  Card,
  Modal,
  Button,
  Container,
  Row,
  Col,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import "./hatch.css";
import { useSelector, useDispatch } from "react-redux";
import {
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../auth/firebase";
import { useParams } from "react-router-dom";
import {
  setScore,
  fetchScoreFromFirebase,
  resetState,
  setOpen,
  saveToMyCalendar,
} from "../../store/scoreSlice";
import { FaCheck } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";

function Hatch({ number, saveMyCalendarsClick }) {
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
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

  const backgroundColor = useSelector(
    (state) => state.calendarStyling.selectedColor
  );

  const hatchFontColor = useSelector(
    (state) => state.calendarStyling.selectedHatchFontColor
  );

  const backgroundImg = useSelector(
    (state) => state.calendarStyling.selectedImage
  );

  const uploadedImage = useSelector(
    (state) => state.calendarStyling.uploadedImage
  );

  const generatedImage = useSelector(
    (state) => state.calendarStyling.generatedImage
  );

  const backgroundImage = generatedImage || backgroundImg || uploadedImage;

  const hatchFont = useSelector((state) => state.calendarStyling.selectedFont);

  const calendarSave = useSelector(
    (state) => state.score?.startedUsing || false
  );

  const hatchModalFontColor = backgroundImage ? "#000000" : hatchFontColor;

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
      let newOpenState = isOpenedHatch || true;
      if (!isOpenedHatch) {
        dispatch(setOpen({ hatchNumber: number, isOpened: newOpenState }));

        await updateDoc(calendarRef, {
          startedUsing: true,
          [`hatches.${number}`]: {
            isOpened: newOpenState,
          },
        });
      }
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
          backgroundColor:
            backgroundImage && isOpenedHatch ? `#f9f5f3` : hatchColor,
          cursor: "pointer",
        }}
        className={`hatchCardUsed flip-card ${isFlipped ? "flipped" : ""} ${
          isOpenedHatch ? "opened" : ""
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
            <p
              className="noContentOpened"
              style={{ color: isFlipped ? hatchColor : hatchModalFontColor }}
            >
              No content
            </p>
          </div>
        )}
        {isOpenedHatch && hatchTextHatch[number] && (
          <div
            className="hatchModalContent"
            style={{
              display: isFlipped ? "none" : "",
              background: hatchColor,
              color: hatchModalFontColor,
            }}
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
            background: backgroundImage
              ? `url(${backgroundImage})`
              : backgroundColor,
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
            background: backgroundImage ? `#f9f5f3` : hatchColor,
          }}
        >
          <div className="hatchModalContent">
            <p style={{ fontFamily: hatchFont, color: hatchModalFontColor }}>
              {hatchTextHatch[number]
                ? hatchTextHatch[number].title
                : "No title"}
            </p>
            <p style={{ fontFamily: hatchFont, color: hatchModalFontColor }}>
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
          <p style={{ fontFamily: hatchFont, color: hatchModalFontColor }}>
            {hatchTextHatch[number] ? (
              <Button
                className="linkToHatchContent"
                variant="link"
                href={hatchTextHatch[number].link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: hatchModalFontColor }}
              >
                {hatchTextHatch[number].link}
              </Button>
            ) : (
              "No link"
            )}
          </p>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip className="tooltip-1">
                {checkState ? "Mark as undone" : "Mark as done"}
              </Tooltip>
            }
          >
            <label className="toggle-btn">
              <input
                type="checkbox"
                checked={checkState}
                onChange={handleClick}
              />
              <span className="slider round"></span>
            </label>
          </OverlayTrigger>
        </Modal.Body>
        <Modal.Footer
          className="hatchModalContent"
          style={{
            backgroundColor: "#FFFAF7",
            justifyContent: "center",
            background: backgroundImage
              ? `url(${backgroundImage})`
              : backgroundColor,
            backgroundSize: "cover",
          }}
        >
          <Button
            className="hatchModalButton"
            onClick={handleClose}
            style={{
              background: backgroundImage ? `#f9f5f3` : hatchColor,
              color: hatchModalFontColor,
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Hatch;
