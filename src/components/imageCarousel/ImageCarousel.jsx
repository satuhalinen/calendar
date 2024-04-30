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
    <Carousel activeIndex={index} onSelect={handleSelect} variant="light">
      <Carousel.Item className="carouselItem" interval={3000}>
        <Image className="d-block w-100" src={carousel1} alt="First slide" />
        <Carousel.Caption className="carouselCaption">
          <h3 className="carouselText">Quality time with the elderly</h3>
          <p className="carouselText">
            Spend quality time with elderly individuals who may be lonely.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carouselItem" interval={3000}>
        <Image className="d-block w-100" src={carousel2} alt="Second slide" />
        <Carousel.Caption className="carouselCaption">
          <h3 className="carouselText">Join the Red Cross</h3>
          <p className="carouselText">
            Help the Red Cross by volunteering and making a difference in the
            world.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carouselItem" interval={3000}>
        <Image className="d-block w-100" src={carousel3} alt="Third slide" />
        <Carousel.Caption className="carouselCaption">
          <h3 className="carouselText">Volunteer at the Soup Kitchen</h3>
          <p className="carouselText">
            Make a difference in the community by volunteering at the local soup
            kitchen.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;