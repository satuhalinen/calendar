import Hatch from "../components/hatch/Hatch.jsx";
import { useParams } from "react-router-dom";
import "../calendar.css";
import { Card } from "react-bootstrap";
import happySymbol from "../assets/happy.svg";
import SmallHeader from "../components/smallHeader/SmallHeader.jsx";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
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
} from "../store/calendarStylingSlice.js";

function Calendar() {
  const dispatch = useDispatch();

  const { calendarTitle } = useParams();
  console.log("Calendar title usepara", calendarTitle);

  // const fetchContent = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       query(collection(db, "calendars", doc.id))
  //     );
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       console.log("Data fetched", data);
  //       dispatch(showCalendarText(data.content));
  //       dispatch(setSelectedImage(data.calendarImage));
  //       dispatch(setSelectedColor(data.calendarBackgroundColor));
  //       dispatch(setSelectedFont(data.calendarFont));
  //       dispatch(setSelectedTitleFont(data.calendarTitleFont));
  //       dispatch(setSelectedHatchColor(data.calendarHatchColor));
  //       dispatch(setSelectedHatchFontColor(data.calendarHatchFontColor));
  //       dispatch(setSelectedHatchesNumber(data.calendarHatchesNumber));
  //       dispatch(setInputValue(data.calendarTitle));
  //     });
  //   } catch (error) {
  //     console.log("Error fetching content", error);
  //   }
  // };

  const fetchContentByTitle = async (title, calendarTitle) => {
    try {
      let q;

      if (calendarTitle) {
        q = query(
          collection(db, "calendars"),
          where("calendarTitle", "==", calendarTitle)
        );
      } else if (title) {
        q = query(
          collection(db, "calendars"),
          where("calendarTitle", "==", title)
        );
      } else {
        console.error("Both title and calendarTitle are falsy");
        return;
      }

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Data fetched", data);
        dispatch(showCalendarText(data.content));
        dispatch(setSelectedImage(data.calendarImage));
        dispatch(setSelectedColor(data.calendarBackgroundColor));
        dispatch(setSelectedFont(data.calendarFont));
        dispatch(setSelectedTitleFont(data.calendarTitleFont));
        dispatch(setSelectedHatchColor(data.calendarHatchColor));
        dispatch(setSelectedHatchFontColor(data.calendarHatchFontColor));
        dispatch(setSelectedHatchesNumber(data.calendarHatchesNumber));
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
  console.log("Title", title);

  useEffect(() => {
    (async () => {
      await fetchContentByTitle(title, calendarTitle);
    })();
  }, [title, calendarTitle]);

  return (
    <>
      <SmallHeader />
      <Card.Title
        style={{ textAlign: "center", margin: "2% 0% 0% 0%", fontSize: "32px" }}
      >
        <p style={{ fontFamily: titleFont }}>{calendarTitle || title}</p>
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
