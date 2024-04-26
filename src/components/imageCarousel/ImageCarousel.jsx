import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./imageCarousel.css";
import carousel1 from "../../assets/carousel1.jpeg";
import carousel2 from "../../assets/carousel2.jpeg";
import carousel3 from "../../assets/carousel3.jpeg";

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
      <Carousel.Item className="carouselItem" interval={3000}>
        <Image
          className="d-block w-100 carouselImg"
          src={carousel1}
          text="First slide"
        />
        <Carousel.Caption>
          <h3 className="carouselText">First slide label</h3>
          <p className="carouselText">
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item className="carouselItem" interval={3000}>
        <Image
          className="d-block w-100 carouselImg"
          src={carousel2}
          text="Second slide"
        />
        <Carousel.Caption>
          <h3 className="carouselText">Second slide label</h3>
          <p className="carouselText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carouselItem" interval={3000}>
        <Image
          className="d-block w-100 carouselImg"
          src={carousel3}
          text="Third slide"
        />
        <Carousel.Caption>
          <h3 className="carouselText">Third slide label</h3>
          <p className="carouselText">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
