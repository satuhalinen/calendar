import { useState, useEffect } from "react";
import "./popUp.css";
import { Link } from "react-router-dom";

const PopUp = ({ showInitially, handleClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(true);
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);

  const handleCloseClick = () => {
    setShowPopup(false);
    handleClose();
  };

  if (!showPopup && showInitially) {
    return (
      <div className="popUpClosed" onClick={() => setShowPopup(true)}>
        Contact
      </div>
    );
  }

  return (
    <div className="popUpOpen">
      <div className="popUpContent">
        <h2 className="popUpTitle">Want to get in touch?</h2>
        <Link to="/contact" className="popUpLink">
          <p className="popUpContactLink">Send us a message!</p>
        </Link>
        <button className="popUpButton" onClick={handleCloseClick}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
