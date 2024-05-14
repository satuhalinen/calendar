import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import Hatch from "../components/hatch/Hatch.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import {
  FaCloud,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaCloudSun,
  FaInfoCircle,
  FaPooStorm,
  FaSun,
} from "react-icons/fa";

import {
  Row,
  Card,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
  Modal,
  Button,
} from "react-bootstrap";

import SmallHeader from "../components/smallHeader/SmallHeader.jsx";
import {
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/avatar.png";
import { showCalendarText } from "../store/alternativesSlice.js";
import {
  setSelectedImage,
  setUploadedImage,
  setGeneratedImage,
  setSelectedColor,
  setSelectedFont,
  setSelectedTitleFont,
  setSelectedHatchColor,
  setSelectedHatchFontColor,
  setSelectedHatchesNumber,
  setInputValue,
  saveImageURL,
} from "../store/calendarStylingSlice.js";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import InfoModal from "../components/infoModal/InfoModal.jsx";
import { saveToMyCalendar } from "../store/scoreSlice.js";
import { setDoc, deleteDoc } from "firebase/firestore";
import { selectProfileImageUrl } from "../store/profileImageSlice.js";

const Calendar = () => {
  const [user] = useAuthState(auth);
  const [weatherIcon, setWeatherIcon] = useState(<FaCloudRain />);
  const toCaptureRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [removed, setRemoved] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [calendarToDelete, setCalendarToDelete] = useState(null);

  const profileImageUrl = useSelector(selectProfileImageUrl);

  const fetchContentById = async () => {
    try {
      const docRef = doc(db, "calendars", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Data fetched", data);

        dispatch(showCalendarText(data.content));
        dispatch(setSelectedImage(data.calendarImage));
        dispatch(setSelectedColor(data.calendarBackgroundColor));
        dispatch(setSelectedFont(data.calendarFont));
        dispatch(setSelectedTitleFont(data.calendarTitleFont));
        dispatch(setSelectedHatchColor(data.calendarHatchColor));
        dispatch(setSelectedHatchFontColor(data.calendarHatchFontColor));
        dispatch(setSelectedHatchesNumber(data.calendarHatchesNumber));
        dispatch(setInputValue(data.calendarTitle));
        dispatch(setUploadedImage(data.calendarUploadedImage));
        dispatch(setGeneratedImage(data.calendarGeneratedImage));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error fetching content", error);
    }
  };

  const selectedHatchesNumber = useSelector(
    (state) => state.calendarStyling.selectedHatchesNumber
  );

  const trueFalseObject = useSelector((state) => state.score?.hatches || {});

  const length = Object.values(trueFalseObject).filter(
    (hatch) => hatch.isChecked
  ).length;

  const progress = (length / selectedHatchesNumber) * 100;

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setUserData(userData);
        console.log("User data", userData);
      });
    };

    fetchUserData();
  }, [user]);

  const hatchFontColor = useSelector(
    (state) => state.calendarStyling.selectedHatchFontColor
  );

  const backgroundColor = useSelector(
    (state) => state.calendarStyling.selectedColor
  );

  const selectedImage = useSelector(
    (state) => state.calendarStyling.selectedImage
  );

  const uploadedImage = useSelector(
    (state) => state.calendarStyling.uploadedImage
  );

  const generatedImage = useSelector(
    (state) => state.calendarStyling.generatedImage
  );

  const titleFont = useSelector(
    (state) => state.calendarStyling.selectedTitleFont
  );

  const title = useSelector((state) => state.calendarStyling.inputValue);

  useEffect(() => {
    if (progress >= 100) {
      setWeatherIcon(<FaSun className="sun-icon" />);
    } else if (progress >= 80) {
      setWeatherIcon(<FaCloudSun className="cloud-sun-icon" />);
    } else if (progress >= 60) {
      setWeatherIcon(<FaCloud className="cloud-icon" />);
    } else if (progress >= 40) {
      setWeatherIcon(<FaCloudRain className="cloud-rain-icon" />);
    } else if (progress >= 20) {
      setWeatherIcon(<FaCloudShowersHeavy className="cloud-heavy-icon" />);
    } else {
      setWeatherIcon(<FaPooStorm className="storm-icon" />);
    }
  }, [progress]);

  useEffect(() => {
    const fetchDataAndCaptureScreenshot = async () => {
      await fetchContentById();
      captureScreenshot();
    };

    fetchDataAndCaptureScreenshot();
  }, []);

  const captureScreenshot = async () => {
    const calendarDocRef = doc(db, "calendars", id);
    const calendarDocSnapshot = await getDoc(calendarDocRef);
    const existingImageURL = calendarDocSnapshot.data().imageURL;

    if (existingImageURL) {
      console.log("Screenshot already exists");
      return;
    }
    if (!toCaptureRef.current) return;

    const width = toCaptureRef.current.offsetWidth;

    const marginWidth = width * 0.02;

    const canvasPromise = html2canvas(toCaptureRef.current, {
      useCORS: true,
      width: width - 2 * marginWidth,
      x: marginWidth,
    });

    canvasPromise.then(async (canvas) => {
      const dataURL = canvas.toDataURL("image/png", 0.05);
      dispatch(saveImageURL(dataURL));

      try {
        const storageRef = ref(storage, `screenshots/${id}.png`);
        await uploadString(storageRef, dataURL, "data_url");
        const downloadURL = await getDownloadURL(storageRef);

        const calendarDocRef = doc(db, "calendars", id);
        await updateDoc(calendarDocRef, {
          imageURL: downloadURL,
        });

        console.log("Image URL saved to Firestore and Storage");
      } catch (error) {
        console.error("Error saving image URL:", error);
      }
    });
  };

  const handleOpenInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  const backgroundImage = selectedImage || uploadedImage || generatedImage;

  const saveMyCalendarsClick = async () => {
    dispatch(saveToMyCalendar(true));
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const document = querySnapshot.docs[0];
    const docId = document.id;
    const calendarRef = doc(db, "users", docId, "myCalendars", id);
    await setDoc(
      calendarRef,
      {
        startedUsing: true,
        hatches: trueFalseObject,
      },
      { merge: true }
    );
    setRemoved(false);
    setCalendarSaved(true);
  };

  const removeMyCalendarClick = async (id) => {
    if (calendarToDelete) {
      dispatch(saveToMyCalendar(false));
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.error('No user document found');
        return;
      }
      const document = querySnapshot.docs[0];
      const docId = document.id;
      try {
        const calendarRef = doc(db, "users", docId, "myCalendars", calendarToDelete);
        await deleteDoc(calendarRef);
        setRemoved(true);
        handleCloseRemoveModal();
      }
      catch (error) {
        console.error('Error deleting calendar:', error);
      }
    }
  };

  const checkIfCalendarInMyCalendars = async () => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const document = querySnapshot.docs[0];
    const userId = document.id;
    const calendarRef = doc(db, "users", userId, "myCalendars", id);
    const calendarSnap = await getDoc(calendarRef);
    setRemoved(!calendarSnap.exists());
  };

  useEffect(() => {
    checkIfCalendarInMyCalendars();
  }, []);

  const checkAdmin = async () => {
    try {
      if (user) {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const adminUsers = usersSnapshot.docs.filter(
          (doc) => doc.data().isAdmin === true
        );
        const adminUserUids = adminUsers.map((doc) => doc.data().uid);
        setIsAdmin(adminUserUids.includes(user.uid));
      } else {
        console.error("User not found");
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  const handleShowRemoveModal = (id) => {
    setCalendarToDelete(id);
    setShowRemoveModal(true);
  };

  const handleCloseRemoveModal = () => {
    setShowRemoveModal(false);
    setCalendarToDelete(null);
  };


  return (
    <>
      <SmallHeader />
      <div className="useCalendar">
        <Row className="d-flex justify-content-center align-items-center">
          <Card className="gamification">
            <Card.Body
              className="gameCardBody"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="userInfo">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip className="tooltip-1">
                      Click to see the instructions.
                    </Tooltip>
                  }
                  delay={{ show: 250, hide: 400 }}
                >
                  <div>
                    <FaInfoCircle
                      className="infoCircle"
                      onClick={() => handleOpenInfoModal()}
                    />
                  </div>
                </OverlayTrigger>
                <Card.Title className="userScoreTitle">
                  <img
                    src={profileImageUrl || avatar}
                    alt="profile"
                    className="profileImageHeader"
                  />
                </Card.Title>
                <Card.Title className="progressTitle">
                  <strong>Progress:</strong>
                </Card.Title>
              </div>
              <ProgressBar
                variant="red"
                now={progress}
                label={`${progress.toFixed()}%`}
                className="progressBar"
              />
              {weatherIcon && (
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip className="tooltip-1">
                      Follow the weather changing based on your progress.
                    </Tooltip>
                  }
                  delay={{ show: 250, hide: 400 }}
                >
                  <div className="weatherIconWrapper">{weatherIcon}</div>
                </OverlayTrigger>
              )}
              {!isAdmin &&
                (removed ? (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip className="tooltip-1">
                        Save the calendar to track your progress.
                      </Tooltip>
                    }
                    delay={{ show: 250, hide: 200 }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#425f5b",
                        fontSize: "0.75rem",
                        borderStyle: "none",
                        padding: "0.7rem 0.3rem",
                        width: "15vw",
                      }}
                      className="saveToMyCalendarsButton"
                      onClick={saveMyCalendarsClick}
                    >
                      Save Calendar
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip className="tooltip-1">
                        Remove the calendar from My Calendars.
                      </Tooltip>
                    }
                    delay={{ show: 250, hide: 200 }}
                  >
                    <Button
                      variant="danger"
                      style={{
                        fontSize: "0.75rem",
                        borderStyle: "none",
                        padding: "0.7rem 0.3rem",
                        width: "20vw",
                        filter: "saturate(0.8)"
                      }}
                      className="removeMyCalendarsButton"
                      onClick={() => handleShowRemoveModal(id)}
                    >
                      Remove Calendar
                    </Button>
                  </OverlayTrigger>
                ))}
            </Card.Body>
          </Card>
        </Row>
        <div className="calendarSections" ref={toCaptureRef}>
          <Card
            style={{
              boxShadow: "0px 0px 5px 0px #00000059",
              border: "none",
              margin: "1.5% 2% 2%",
              backgroundColor: backgroundColor,
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : "none",
              backgroundSize: "cover",
            }}
          >
            <Card.Title
              style={{
                textAlign: "center",
                margin: "3% 0% 0.5% 0%",
                color: hatchFontColor,
              }}
              className="useCalendarTitle"
            >
              <p style={{ fontFamily: titleFont }}>{title}</p>
            </Card.Title>
            <div className="calendar">
              {Array.from({ length: selectedHatchesNumber }).map((_, i) => (
                <Hatch key={i} number={i + 1} />
              ))}
            </div>
          </Card>
          <InfoModal show={showInfoModal} handleClose={handleCloseInfoModal} />
        </div>
        <Modal className="removeModal" centered show={showRemoveModal} onHide={handleCloseRemoveModal}>
          <Modal.Header className="removeModalHeader">
            <Modal.Title className="removeModalTitle">Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body className="removeModalBody">
            <strong><p>Are you sure you want to remove this calendar?</p></strong>
            <p>You will lose all your progress!</p>
          </Modal.Body>
          <Modal.Footer className="removeModalFooter">
            <Button className="deleteRemoveModalButton" variant="danger" onClick={removeMyCalendarClick}>
              Remove
            </Button>
            <Button className="removeModalButton" variant="secondary" onClick={handleCloseRemoveModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div >
    </>
  );
};

export default Calendar;
