import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import Hatch from "../components/hatch/Hatch.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { Row, Col, Card, ProgressBar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaCloud, FaCloudRain, FaCloudShowersHeavy, FaCloudSun, FaInfoCircle, FaPooStorm, FaSun } from "react-icons/fa";
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
import { showCalendarText } from "../store/alternativesSlice.js";
import {
  setSelectedImage,
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

const Calendar = () => {
  const [user] = useAuthState(auth);
  const [checkedHatches, setCheckedHatches] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(<FaCloudRain />);
  const toCaptureRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [showInfoModal, setShowInfoModal] = useState(false);

  const fetchContentById = async () => {
    if (!id) {
      console.log("ID is undefined", "id: ", id);

      // Fetch all documents from the "calendars" collection
      const querySnapshot = await getDocs(collection(db, "calendars"));

      // Print the IDs of all documents
      querySnapshot.forEach((doc) => {
        console.log("Calendar ID:", doc.id);
      });

      return;
    }
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
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error fetching content", error);
    }
  };

  const handleCheck = (number, isChecked) => {
    setCheckedHatches((prevState) => ({
      ...prevState,
      [number]: isChecked,
    }));
  };

  const calculateScore = () => {
    return Object.values(checkedHatches).filter((isChecked) => isChecked)
      .length;
  };

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setUserData(userData);
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

  const selectedHatchesNumber = useSelector(
    (state) => state.calendarStyling.selectedHatchesNumber
  );

  const titleFont = useSelector(
    (state) => state.calendarStyling.selectedTitleFont
  );

  const title = useSelector((state) => state.calendarStyling.inputValue);

  const maxScore = selectedHatchesNumber;
  const score = calculateScore();
  const progress = (score / maxScore) * 100;

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
    (async () => {
      await fetchContentById();
    })();
  }, []);

  const captureScreenshot = () => {
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


  return (
    <>
      <SmallHeader />
      <div className="useCalendar">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={3}>
            <NavLink to="/admin-calendars" onClick={() => captureScreenshot()}>
              <button className="backToAdminCalendars">
                Back to Calendars
              </button>
            </NavLink>
          </Col>
          <Col xs={9}>
            <Card className="gamification">
              <Card.Body className="gameCardBody" style={{ display: "flex", alignItems: "center" }}>
                <div className="userInfo">
                  <FaInfoCircle className="infoCircle" onClick={() => handleOpenInfoModal()} />
                  <Card.Title
                    className="userScoreTitle"
                  >
                    <strong className="userNameTitle">Username:</strong> {userData.fullname}
                  </Card.Title>
                  <Card.Title
                    className="progressTitle"
                  >
                    <strong>Progress:</strong>
                  </Card.Title>
                </div>
                <ProgressBar
                  variant="red"
                  now={progress}
                  label={`${progress.toFixed()}%`}
                  className="progressBar" />
                {weatherIcon && <div className="weatherIconWrapper">{weatherIcon}</div>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="calendarSections" ref={toCaptureRef}>
          <Card
            style={{
              boxShadow: "0px 0px 5px 0px #00000059",
              border: "none",
              margin: "1.5% 2% 2%",
              backgroundColor: backgroundColor,
              backgroundImage: `url(${selectedImage})`,
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
                <Hatch key={i} number={i + 1} onCheck={handleCheck} />
              ))}
            </div>
          </Card>
          <InfoModal
            show={showInfoModal}
            handleClose={handleCloseInfoModal}
          />
        </div>
      </div>
    </>
  );
};

export default Calendar;
