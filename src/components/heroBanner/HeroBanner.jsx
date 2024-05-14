import { IoIosArrowDropdownCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import "./heroBanner.css";
import hero2 from "../../assets/hero2.jpg";

const HeroBanner = () => {
  const handleScroll = () => {
    const nextSection = document.querySelector(".versions-wrap");
    const offset = 60;
    const targetPosition = nextSection.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  };

  return (
    <div className="heroContainer">
      <img src={hero2} alt="Hero" className="heroImg" />
      <div className="heroContent">
        <h3 className="heroTextHeader">Design Your Volunteer Calendar</h3>
        <p className="heroText">
          Be the architect of a better tomorrow. Customize calendars that advocate for progress, equality, and justice. Together, let's turn aspirations into achievements!
        </p>
        <NavLink to="/register" className="heroButton">Create a Calendar</NavLink>
      </div>
      <button className="heroImageArrowButton" onClick={handleScroll}>
        <IoIosArrowDropdownCircle />
      </button>
    </div>
  );
};

export default HeroBanner;