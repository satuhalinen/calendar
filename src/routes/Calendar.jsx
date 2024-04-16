import Hatch from "../components/hatch/Hatch.jsx";
import "../calendar.css";
import { Card } from "react-bootstrap";
import happySymbol from "../assets/happy.svg";
import SmallHeader from "../components/smallHeader/SmallHeader.jsx";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../auth/firebase";
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
} from "../store/calendarStylingSlice.js";

function Calendar() {
  const dispatch = useDispatch();

  const fetchContent = async () => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "calendars"),
          orderBy("createdAt", "desc"),
          limit(1)
        )
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

  return (
    <>
      <SmallHeader />
      <Card.Title
        style={{ textAlign: "center", margin: "2% 0% 0% 0%", fontSize: "32px" }}
      >
        <p style={{ fontFamily: titleFont }}>{title}</p>
      </Card.Title>
      <div className="calendarSections" style={{ display: "flex" }}>
        <Card
          className="calendar"
          style={{
            margin: "2% 2%",
            backgroundColor: backgroundColor,
            backgroundImage: `url(${selectedImage})`,
            backgroundSize: "cover",
          }}
        >
          {Array.from({ length: selectedHatchesNumber }).map((_, i) => (
            <Hatch key={i} number={i + 1} />
          ))}
        </Card>
        <Card
          className="gamification"
          style={{
            display: "grid",
            width: "30%",
            height: "500px",
            margin: "5% 5% 5% 0%",
            justifyItems: "center",
          }}
        >
          <Card.Body>
            <Card.Title style={{ margin: "20% 0%" }}>
              See your score here!
            </Card.Title>
          </Card.Body>
          <Card.Img variant="top" src={happySymbol} style={{ width: "20%" }} />
        </Card>
      </div>
    </>
  );
}

export default Calendar;
