import { Carousel } from "react-bootstrap";
import { useState } from "react";
import exampleCalendar from "../../assets/exampleCalendar.png";
import exampleCalendar2 from "../../assets/exampleCalendar2.png";
import exampleCalendar3 from "../../assets/exampleCalendar3.png";
import exampleCalendar4 from "../../assets/exampleCalendar4.png";
import exampleCalendar5 from "../../assets/exampleCalendar5.png";
import exampleCalendar6 from "../../assets/exampleCalendar6.png";
import exampleCalendar7 from "../../assets/exampleCalendar7.png";
import exampleCalendar8 from "../../assets/exampleCalendar8.png";
import exampleCalendar9 from "../../assets/exampleCalendar9.png";
import "./calendarCarousel.css";

const CalendarCarousel = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setSelectedIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={selectedIndex} onSelect={handleSelect} className="customCarousel">
            <Carousel.Item className="carouselItem" interval={3000}>
                <div className="d-flex firstCarousel">
                    <img src={exampleCalendar} alt="Image1" className="calendarCarouselImg" />
                    <img src={exampleCalendar2} alt="Image2" className="calendarCarouselImg" />
                    <img src={exampleCalendar3} alt="Image3" className="calendarCarouselImg" />
                </div>
            </Carousel.Item>
            <Carousel.Item className="carouselItem" interval={3000}>
                <div className="d-flex firstCarousel">
                    <img src={exampleCalendar4} alt="Image1" className="calendarCarouselImg" />
                    <img src={exampleCalendar5} alt="Image2" className="calendarCarouselImg" />
                    <img src={exampleCalendar6} alt="Image3" className="calendarCarouselImg" />
                </div>
            </Carousel.Item>
            <Carousel.Item className="carouselItem" interval={3000}>
                <div className="d-flex firstCarousel">
                    <img src={exampleCalendar7} alt="Image1" className="calendarCarouselImg" />
                    <img src={exampleCalendar8} alt="Image2" className="calendarCarouselImg" />
                    <img src={exampleCalendar9} alt="Image3" className="calendarCarouselImg" />
                </div>
            </Carousel.Item>
        </Carousel>
    )
}

export default CalendarCarousel