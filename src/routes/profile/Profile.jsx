import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../auth/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { BsImage } from "react-icons/bs";
import { fetchProfileImage } from "../../store/actions/actions";
import {
  selectProfileImageUrl,
  updateProfileImageUrl,
} from "../../store/profileImageSlice";
import "./profile.css";
import defaultScreenshot from "../../assets/defaultScreenshot.png";
import useMyCalendarData from "../../hooks/useMyCalendarData";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";

export default function Profile() {
  const [user] = useAuthState(auth);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ fullname: "", email: "" });
  const { myCalendars, intersectionObserverRef } = useMyCalendarData();
  const [docId, setDocId] = useState(null);

  const dispatch = useDispatch();
  const profileImageUrl = useSelector(selectProfileImageUrl);

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
    dispatch(fetchProfileImage(user.uid));
  }, [dispatch, user.uid]);

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
      dispatch(updateProfileImageUrl(downloadURL));
      console.log("Image uploaded successfully");
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="mainContent">
      <div className="wholeProfileContainer">
        <Container className="profile-container">
          <h3 className="h3Profile text-center">Profile</h3>
          <Col className="profileContent">
            <Row>
              <Col>
                <div className="profileImgContainer">
                  <Image
                    className="profileImg"
                    src={profileImageUrl || avatar}
                    alt="avatar"
                  />
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
        <h3 className="h3savedCalendars">My calendars preview</h3>
        <Container>
          <Row className="favoriteCards">
            {myCalendars.slice(0, 3).map((calendar) => (
              <Col
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
                  <button className="useMyCalendarButton">Use Calendar</button>
                </NavLink>
              </Col>
            ))}
          </Row>
          <Row>
            <Link className="linkToMyCalendars" to="/my-calendars">
              See all my calendars
            </Link>
          </Row>
        </Container>
      </div>
    </div>
  );
}
