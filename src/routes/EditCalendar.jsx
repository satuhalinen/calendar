import EditHatch from "../components/editHatch/EditHatch";
import "../calendar.css";
import { Card, Button } from "react-bootstrap";
import SmallHeader from "../components/smallHeader/SmallHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  serverTimestamp,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import {
  fetchFromFirebase,
  setAvailableAlternatives,
} from "../store/alternativesSlice";
import "./editCalendar.css";
import { useNavigate } from "react-router-dom";

function EditCalendar() {
  const backgroundColor = useSelector(
    (state) => state.calendarStyling.selectedColor
  );

  const hatchColor = useSelector(
    (state) => state.calendarStyling.selectedHatchColor
  );

  const selectedImage = useSelector(
    (state) => state.calendarStyling.selectedImage
  );

  const selectedFont = useSelector(
    (state) => state.calendarStyling.selectedFont
  );

  const selectedHatchFontColor = useSelector(
    (state) => state.calendarStyling.selectedHatchFontColor
  );

  const selectedHatchesNumber = useSelector(
    (state) => state.calendarStyling.selectedHatchesNumber
  );

  const titleFont = useSelector(
    (state) => state.calendarStyling.selectedTitleFont
  );

  const title = useSelector((state) => state.calendarStyling.inputValue);

  const dispatch = useDispatch();

  const fetchAlternatives = async () => {
    const colRef = collection(db, "topic");
    const querySnapshot = await getDocs(colRef);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(setAvailableAlternatives(data));
  };

  useEffect(() => {
    (async () => {
      await fetchAlternatives();
    })();
  }, []);
  const navigate = useNavigate();
  const saveHatchText = async () => {
    if (calendarContent !== undefined) {
      const docRef = await addDoc(collection(db, "calendars"), {
        content: calendarContent,
        calendarBackgroundColor: backgroundColor,
        calendarHatchColor: hatchColor,
        calendarImage: selectedImage,
        calendarFont: selectedFont,
        calendarHatchFontColor: selectedHatchFontColor,
        calendarHatchesNumber: selectedHatchesNumber,
        calendarTitleFont: titleFont,
        calendarTitle: title,
        createdAt: serverTimestamp(),
      });
      const calendarId = docRef.id;
      navigate(`/calendar/${calendarId}`);
    }
  };

  const calendarContent = useSelector(
    (state) => state.alternatives.savedAlternatives
  );

  const fetchAlternativesFromFirebase = async () => {
    const docRef = doc(db, "calendars", "calendar");
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data().content;
      if (data !== undefined) {
        dispatch(fetchFromFirebase(data));
        console.log("data", data);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAlternativesFromFirebase();
    })();
  }, []);

  return (
    <>
      <SmallHeader />
      <div style={{ display: "grid" }} className="editCalendar">
        <div className="calendarSections" style={{ display: "flex" }}>
          <Card
            style={{
              margin: "1.5% 0",
              backgroundImage: `url(${selectedImage})`,
              backgroundColor: backgroundColor,
              backgroundSize: "cover",
              boxShadow: "0px 0px 5px 0px #00000059",
              border: "none",
            }}
          >
            <Card.Title
              style={{
                textAlign: "center",
                margin: "3% 0% 0% 0%",
                fontFamily: titleFont,
                color: selectedHatchFontColor,
              }}
            >
              <p className="editCalendarTitle">{title}</p>
            </Card.Title>
            <div className="calendar">
              {Array.from({ length: selectedHatchesNumber || 31 }).map(
                (_, i) => (
                  <EditHatch key={i} number={i + 1} />
                )
              )}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            style={{
              width: "20%",
              margin: "0% 0% 2% 0%",
              backgroundColor: "#BA6C2C",
              color: "#FFFAF7",
              border: "none",
            }}
            href="/create-calendar"
          >
            back
          </Button>

          <Button
            onClick={saveHatchText}
            style={{
              width: "20%",
              justifySelf: "center",
              backgroundColor: "#BA6C2C",
              color: "#FFFAF7",
              border: "none",
              margin: "0% 0% 2% 0%",
            }}
          >
            Create calendar
          </Button>
        </div>
      </div>
    </>
  );
}

export default EditCalendar;
