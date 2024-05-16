import EditOldHatch from "../../components/EditOldHatch.jsx";
import "../../routes/calendar/calendar.css";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../auth/firebase";
import {
  fetchFromFirebase,
  setAvailableAlternatives,
} from "../../store/alternativesSlice";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import SmallHeader from "../../components/smallHeader/SmallHeader.jsx";
import Footer from "../../components/footer/Footer.jsx";

function ModifyOldCalendar() {
  const { id } = useParams();
  console.log(id);
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
      const docRef = doc(db, "calendars", id);

      await setDoc(
        docRef,
        {
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
        },
        { merge: true }
      );

      navigate(`/calendar/${id}`, { state: { from: true } });
      console.log("Document updated with ID: ", id);
    }
  };

  const calendarContent = useSelector(
    (state) => state.alternatives.savedAlternatives
  );

  const backgroundImage = selectedImage || uploadedImage || generatedImage;

  const fetchAlternativesFromFirebase = async () => {
    const docRef = doc(db, "calendars", id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data().content;
      if (data !== undefined) {
        dispatch(fetchFromFirebase(data));
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
                  <EditOldHatch key={i} number={i + 1} />
                )
              )}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink
            to={`/modify-old-calendar-styling/${id}`}
            style={{
              width: "30%",
              margin: "0% 0% 2% 0%",
              backgroundColor: "#BA6C2C",
              color: "#FFFAF7",
              border: "none",
              textDecoration: "none",
            }}
            className="backToCreateCalendarButton"
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
            Save calendar
          </NavLink>
        </div>
      </div >
      <Footer />
    </>
  );
}
export default ModifyOldCalendar;
