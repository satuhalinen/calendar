import EditHatch from "../components/editHatch/EditHatch";
import "../calendar.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import SmallHeader from "../components/smallHeader/SmallHeader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import {
  fetchFromFirebase,
  setAvailableAlternatives,
} from "../store/alternativesSlice";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

function EditCalendar() {
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

  const saveHatchText = async () => {
    if (calendarContent !== undefined) {
      await setDoc(doc(db, "calendars", "calendar"), {
        content: calendarContent,
      });
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
        <Card.Title
          style={{
            textAlign: "center",
            margin: "3% 0% 0% 0%",
            fontSize: "40px",
          }}
        >
          Edit Calendar
        </Card.Title>
        <div className="calendarSections" style={{ display: "flex" }}>
          <Card className="calendar" style={{ margin: "2%" }}>
            {Array.from({ length: 31 }).map((_, i) => (
              <EditHatch key={i} number={i + 1} />
            ))}
          </Card>
        </div>
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
          Save calendar
        </Button>
      </div>
    </>
  );
}

export default EditCalendar;
