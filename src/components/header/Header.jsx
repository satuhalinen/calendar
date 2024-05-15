import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import { Image } from "react-bootstrap";
import "../header/header.css";
import { auth, logout } from "../../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectProfileImageUrl } from "../../store/profileImageSlice";
import { fetchProfileImage } from "../../store/actions/actions";
import avatar from "../../assets/avatar.png";

export default function Header() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const profileImageUrl = useSelector(selectProfileImageUrl);

  const handleClickOutsideMenu = (event) => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (
      navbarCollapse.classList.contains("show") &&
      !navbarToggler.contains(event.target) &&
      !navbarCollapse.contains(event.target)
    ) {
      navbarToggler.click();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchProfileImage(user.uid));
    }
  }, [user, dispatch]);

  const adminHeaderColor = [
    "/",
    "/adminpanel",
    "/admin-calendars",
    "/create-calendar",
    "/edit-calendar",
    "/user-management",
    "/customer-messages",
    "/login",
    "/register",
    "/about",
    "/terms-and-conditions",
    "/contact",
  ];
  const userHeaderRoutes = [
    "/",
    "/login",
    "/register",
    "/about",
    "/terms-and-conditions",
    "/contact",
  ];
  const authenticatedUserRoutes = [
    "/profile",
    "/calendars",
    "/my-calendars",
    "/logout",
    "/account-settings",
  ];
  const authenticatedAdminRoutes = [
    "/adminpanel",
    "/logout",
    "/admin-calendars",
    "/create-calendar",
    "/user-management",
    "/customer-messages",
  ];

  const isAdminRoute = adminHeaderColor.includes(location.pathname);
  const isUserRoute = userHeaderRoutes.includes(location.pathname);
  const isAuthenticatedUser = authenticatedUserRoutes.includes(
    location.pathname
  );
  const isAuthenticatedAdmin = authenticatedAdminRoutes.includes(
    location.pathname
  );

  // Preload images to make the change faster
  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        [logo1, logo2].map((src) => {
          return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  if (
    location.pathname === "/calendar" ||
    location.pathname === "/edit-calendar" ||
    location.pathname === `/calendar/${id}`
  ) {
    return null;
  }

  return (
    <Navbar
      className={isAdminRoute ? "navBarAdmin" : "navBarDefault"}
      fixed="top"
      expand="lg"
    >
      <Container>
        {imagesLoaded && (
          <NavLink to="/">
            <Image
              src={isAdminRoute ? logo1 : logo2}
              width="auto"
              height="70"
              className="d-inline-block align-top"
              alt="VOCA logo"
            />
          </NavLink>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto links">
            {isUserRoute && (
              <>
                {user ? (
                  <>
                    <Nav.Link as={NavLink} to="/profile" className="navLink">
                      <img
                        src={profileImageUrl || avatar}
                        alt="profile"
                        className="profileImageHeader"
                      />
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/calendars" className="navLink">
                      All Calendars
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/my-calendars" className="navLink">
                      My Calendars
                    </Nav.Link>
                    <button onClick={logout} className="navLinkButton">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Nav.Link as={NavLink} to="/" className="navLink">
                      Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/login" className="navLink">
                      Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/register" className="navLink">
                      Register
                    </Nav.Link>
                  </>
                )}
                <Nav.Link as={NavLink} to="/about" className="navLink">
                  About
                </Nav.Link>
              </>
            )}
            {isAuthenticatedUser && (
              <>
                <Nav.Link as={NavLink} to="/profile" className="navLink">
                  <img
                    src={profileImageUrl || avatar}
                    alt="profile"
                    className="profileImageHeader"
                  />
                </Nav.Link>
                <Nav.Link as={NavLink} to="/calendars" className="navLink">
                  All Calendars
                </Nav.Link>
                <Nav.Link as={NavLink} to="/my-calendars" className="navLink">
                  My Calendars
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/"
                  onClick={logout}
                  className="navLink"
                >
                  Logout
                </Nav.Link>
                <Nav.Link as={NavLink} to="/about" className="navLink">
                  About
                </Nav.Link>
              </>
            )}
            {isAuthenticatedAdmin && (
              <>
                <Nav.Link as={NavLink} to="/" className="navLink">
                  Home
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/"
                  onClick={logout}
                  className="navLink"
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}