import { NavLink, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import { Image } from 'react-bootstrap';
import '../header/header.css';
import { useEffect, useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const adminHeaderColor = ['/', '/adminpanel', '/admin-calendars', '/create-calendar', '/edit-calendar'];
  const userHeaderRoutes = ['/', '/login', '/register', '/about'];
  const authenticatedUserRoutes = ['/profile', '/calendars', '/favorites', '/logout'];
  const authenticatedAdminRoutes = ['/adminpanel', '/logout'];

  const isAdminRoute = adminHeaderColor.includes(location.pathname);
  const isUserRoute = userHeaderRoutes.includes(location.pathname);
  const isAuthenticatedUser = authenticatedUserRoutes.includes(location.pathname);
  const isAuthenticatedAdmin = authenticatedAdminRoutes.includes(location.pathname);

  // Preload images to make the change faster
  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all([logo1, logo2].map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      }));
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  return (
    <Navbar className={isAdminRoute ? 'navBarAdmin' : 'navBarDefault'} fixed='top'>
      <Container>
        {imagesLoaded && (
          <Image
            src={isAdminRoute ? logo1 : logo2}
            width="auto"
            height="70"
            className="d-inline-block align-top"
            alt="logo"
          />
        )}
        <Nav className="links">
          {isUserRoute && (
            <>
              <Nav.Link as={NavLink} to="/" className="navLink">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/login" className="navLink">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register" className="navLink">Register</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="navLink">About</Nav.Link>
            </>
          )}
          {isAuthenticatedUser && (
            <>
              <Nav.Link as={NavLink} to="/profile" className="navLink">Profile</Nav.Link>
              <Nav.Link as={NavLink} to="/calendars" className="navLink">Calendars</Nav.Link>
              <Nav.Link as={NavLink} to="/favorites" className="navLink">Favorites</Nav.Link>
              <Nav.Link as={NavLink} to="/" className="navLink">Logout</Nav.Link>
            </>
          )}
          {isAuthenticatedAdmin && (
            <>
              <Nav.Link as={NavLink} to="/adminpanel" className="navLink">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/" className="navLink">Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}