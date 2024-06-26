import EditHatch from "../../components/editHatch/EditHatch";
import "../calendar/calendar.css";
import { Card } from "react-bootstrap";
import SmallHeader from "../../components/smallHeader/SmallHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../../auth/firebase";
import { setAvailableAlternatives } from "../../store/alternativesSlice";
import "./editCalendar.css";
import { useNavigate, NavLink } from "react-router-dom";

function EditCalendar() {
  const backgroundColor = useSelector(
    (state) => state.calendarStyling.selectedColor
  );

  const hatchColor = useSelector(
    (state) => state.calendarStyling.selectedHatchColor
  );

  const generatedImage = useSelector(
    (state) => state.calendarStyling.generatedImage
  );

  const uploadedImage = useSelector(
    (state) => state.calendarStyling.uploadedImage
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
    const colRef = collection(db, "categories");
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
        calendarUploadedImage: uploadedImage,
        calendarGeneratedImage: generatedImage,
        createdAt: serverTimestamp(),
      });
      const calendarId = docRef.id;
      navigate(`/calendar/${calendarId}`);
    }
  };

  const calendarContent = useSelector(
    (state) => state.alternatives.savedAlternatives
  );

  const backgroundImage = selectedImage || uploadedImage || generatedImage;

  return (
    <>
      <SmallHeader />
      <div className="editCalendar">
        <div className="editCalendarSections">
          <Card
            style={{
              margin: "1.5% 0",
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : "none",
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
            <div className="editCalendarGrid">
              {Array.from({ length: selectedHatchesNumber || 31 }).map(
                (_, i) => (
                  <EditHatch key={i} number={i + 1} />
                )
              )}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink
            style={{
              width: "30%",
              margin: "0% 0% 2% 0%",
              backgroundColor: "#BA6C2C",
              color: "#FFFAF7",
              border: "none",
              textDecoration: "none",
            }}
            className="backToCreateCalendarButton"
            to="/create-calendar"
          >
            Back
          </NavLink>

          <NavLink
            onClick={saveHatchText}
            style={{
              justifySelf: "center",
              backgroundColor: "#BA6C2C",
              color: "#FFFAF7",
              border: "none",
              margin: "0% 0% 2% 0%",
              textDecoration: "none",
            }}
            className="createCalendarButton"
            to="#"
          >
            Create calendar
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default EditCalendar;
