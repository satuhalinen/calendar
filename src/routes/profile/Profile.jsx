import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../auth/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { BsImage } from "react-icons/bs";
import "./profile.css";
import avatar from "../../assets/avatar.png";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import useCalendarData from "../../hooks/useCalendarData";

export default function Profile() {
  const [user] = useAuthState(auth);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(avatar);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const { calendars, intersectionObserverRef } = useCalendarData();
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const docId = doc.id;
        setUserData(userData);
        setDocId(docId);
      });
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }
  }, [user]);

  useEffect(() => {
    const handleClick = async () => {
      if (!photo || !user) return;

      await upload(photo, user, setLoading);
    };

    if (photo) {
      handleClick();
    }
  }, [photo, user, setLoading]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const upload = async (file, currentUser, setLoading) => {
    const fileExtension = file.name.split(".").pop();
    const fileRef = ref(
      storage,
      `profileImg/${currentUser.uid}.${fileExtension}`
    );

    setLoading(true);
    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      await updateProfile(currentUser, { photoURL: downloadURL });
      setLoading(false);
      setPhotoUrl(downloadURL); // Update photoURL in component state
      console.log("Image uploaded successfully");
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="mainContent">
      <Container className="profile-container">
        <Row className="profileInfo">
          <Col>
            <h3 className="h3Profile text-center">Profile</h3>
          </Col>
        </Row>
        <Col className="profileContent">
          <Row>
            <Col>
              <div className="profileImgContainer">
                <Image className="profileImg" src={photoUrl} alt="avatar" />
                <label className="inputImg">
                  <input
                    disabled={loading}
                    type="file"
                    onChange={handleChange}
                  />
                  <BsImage style={{ fontSize: "12px" }} />
                </label>
              </div>
            </Col>
            <Col className="profileText">
              <p>Name: {userData.fullname}</p>
              <p>Email: {userData.email}</p>
              <Link
                className="linkToAccount"
                to={{
                  pathname: "/account-settings",
                }}
                state={{ docID: docId }}
              >
                <p className="linkToAccount">Account Settings</p>
              </Link>
            </Col>
          </Row>
        </Col>
      </Container>
      <h3 className="h3savedCalendars">Saved calendars</h3>
      <Container>
        <Row className="favoriteCards">
          {calendars.slice(0, 4).map((calendar) => (
            <Col
              xs={12}
              md={4}
              key={calendar.id}
              className="calendarCard profileCalendar"
              data-calendar-id={calendar.id}
              ref={(calendarRef) =>
                calendarRef &&
                intersectionObserverRef.current &&
                intersectionObserverRef.current.observe(calendarRef)
              }
            >
              <NavLink
                to={`/calendar/${calendar.id}`}
                className="calendarLinkFavorite"
              >
                <img
                  src={calendar.imageUrl || defaultScreenshot}
                  alt="no img"
                  className="defaultScreenshotFavorite"
                />
                <button className="useCalendarButton">Use Calendar</button>
              </NavLink>
            </Col>
          ))}
        </Row>
        <Row>
          <Link className="linkToFavorites" to="/favorites">
            See all of your favorites
          </Link>
        </Row>
      </Container>
    </div>
  );
}
