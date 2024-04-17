import { useRef } from "react";
import html2canvas from "html2canvas";
import Hatch from "../components/hatch/Hatch.jsx";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import happySymbol from "../assets/happy.svg";
import SmallHeader from "../components/smallHeader/SmallHeader.jsx";
import { collection, getDocs, limit, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../auth/firebase"; // Import storage from Firebase configuration
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
import { ref, uploadString, getDownloadURL } from "firebase/storage"; // Import storage functions

const Calendar = () => {
  const toCaptureRef = useRef(null);
  const dispatch = useDispatch();

  const fetchContent = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "calendars"), orderBy("createdAt", "desc"), limit(1))
      );
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        dispatch(showCalendarText(data.content));
        dispatch(setSelectedImage(data.calendarImage));
        dispatch(setSelectedColor(data.calendarBackgroundColor));
        dispatch(setSelectedFont(data.calendarFont));
        dispatch(setSelectedTitleFont(data.calendarTitleFont));
        dispatch(setSelectedHatchColor(data.calendarHatchColor));
        dispatch(setSelectedHatchFontColor(data.calendarHatchFontColor));
        dispatch(setSelectedHatchesNumber(data.calendarHatchesNumber));
        dispatch(setInputValue(data.calendarTitle));

      });
    } catch (error) {
      console.log("Error fetching content", error);
    }
  };

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

  useEffect(() => {
    (async () => {
      await fetchContent();
    })();
  }, []);

  const captureScreenshot = () => {
    if (!toCaptureRef.current) return;

    const canvasPromise = html2canvas(toCaptureRef.current, {
      useCORS: true,
    });

    canvasPromise.then(async (canvas) => {
      const dataURL = canvas.toDataURL("image/png", 0.001);
      dispatch(saveImageURL(dataURL));

      try {
        const storageRef = ref(storage, "images/" + title + ".png");
        await uploadString(storageRef, dataURL, "data_url");
        const downloadURL = await getDownloadURL(storageRef);

        const calendarDocRef = doc(db, "calendars", title);
        await updateDoc(calendarDocRef, {
          imageURL: downloadURL,
        });

        console.log("Image URL saved to Firestore and Storage");
      } catch (error) {
        console.error("Error saving image URL:", error);
      }
    });
  };

  return (
    <>
      <SmallHeader />
      <div className="useCalendar">
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={3}>
            <NavLink to="/admin-calendars" onClick={() => captureScreenshot()}>
              <button className="backToAdminCalendars">Back to Calendars</button>
            </NavLink>
          </Col>
          <Col xs={9}>
            <Card className="gamification">
              <Card.Body style={{ display: "flex", alignItems: "center" }}>
                <Card.Title className="scoreTitle" style={{ marginRight: "30px" }}>
                  <strong>Name:</strong> Username here
                </Card.Title>
                <Card.Title className="scoreTitle" style={{ marginRight: "10px" }}>
                  Score:
                </Card.Title>
                <Card.Img
                  variant="top"
                  src={happySymbol}
                  style={{ width: "20px", marginBottom: "0.5rem" }}
                />
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
              style={{ textAlign: "center", margin: "3% 0% 0.5% 0%", color: hatchFontColor }}
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
        </div>
      </div >
    </>
  );
};

export default Calendar;