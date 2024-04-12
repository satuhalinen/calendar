import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../auth/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { BsImage } from "react-icons/bs";
import "./profile.css";
import avatar from "../../assets/avatar.png";

export default function Profile() {
  const [user] = useAuthState(auth);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(avatar);
  const [userData, setUserData] = useState({ name: "", email: "" });

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
    const fileRef = ref(storage, `${currentUser.uid}.${fileExtension}`);

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
                  <input disabled={loading} type="file" onChange={handleChange} />
                  <BsImage style={{ fontSize: '12px' }} />
                </label>
              </div>
            </Col>
            <Col className="profileText">
              <p>Name: {userData.fullname}</p>
              <p>Email: {userData.email}</p>
              <Link className="linkToAccount" to="/account-settings">
                <p className="linkToAccount">Account Settings</p>
              </Link>
            </Col>
          </Row>
        </Col>
      </Container>
      <h3 className="h3savedCalendars">Saved calendars</h3>
      <Container>
        <Row className="favoriteCards">
          <Col className="calendarCard profileCalendar">
            <p>Calendar 1</p>
          </Col>
          <Col className="calendarCard profileCalendar">
            <p>Calendar 2</p>
          </Col>
          <Col className="calendarCard profileCalendar">
            <p>Calendar 3</p>
          </Col>
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
