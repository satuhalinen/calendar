import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Leftbar from "../../components/leftbar/Leftbar";
import { Button, Form } from "react-bootstrap";
import "./createCalendar.css";
import { SketchPicker } from "react-color";
import TitleFontPicker from "../../components/titleFontPicker/TitleFontPicker";
import FontPicker from "../../components/fontPicker/FontPicker";
import ImagePicker from "../../components/imagePicker/ImagePicker";
import { ArrowDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  setSelectedColor,
  setSelectedHatchColor,
  setSelectedHatchFontColor,
  setSelectedImage,
  setSelectedHatchesNumber,
  setColorShow,
  setFontShow,
  setTitleFontShow,
  setImageShow,
  setHatchColorShow,
  setHatchFontColorShow,
  setInputValue,
} from "../../store/calendarStylingSlice";

export default function CreateCalendar() {
  const dispatch = useDispatch();

  const selectedImage = useSelector(
    (state) => state.calendarStyling.selectedImage
  );
  const selectedColor = useSelector(
    (state) => state.calendarStyling.selectedColor
  );
  const selectedFont = useSelector(
    (state) => state.calendarStyling.selectedFont
  );
  const selectedTitleFont = useSelector(
    (state) => state.calendarStyling.selectedTitleFont
  );
  const selectedHatchColor = useSelector(
    (state) => state.calendarStyling.selectedHatchColor
  );
  const selectedHatchFontColor = useSelector(
    (state) => state.calendarStyling.selectedHatchFontColor
  );

  const colorShow = useSelector((state) => state.calendarStyling.colorShow);
  const fontShow = useSelector((state) => state.calendarStyling.fontShow);
  const titleFontShow = useSelector(
    (state) => state.calendarStyling.titleFontShow
  );
  const imageShow = useSelector((state) => state.calendarStyling.imageShow);
  const hatchColorShow = useSelector(
    (state) => state.calendarStyling.hatchColorShow
  );
  const hatchFontColorShow = useSelector(
    (state) => state.calendarStyling.hatchFontColorShow
  );
  const inputValue = useSelector((state) => state.calendarStyling.inputValue);

  const handleBackgroundColorClick = () => {
    dispatch(setColorShow());
  };

  const handleFontSelect = (font) => {
    dispatch(setFontShow());
  };

  const handleTitleFontSelect = (font) => {
    dispatch(setTitleFontShow());
  };

  const handleImageClick = (imageUrl) => {
    dispatch(setImageShow());
  };

  const handleHatchColorSelect = (color) => {
    dispatch(setHatchColorShow());
  };

  const handleHatchFontColorSelect = (color) => {
    dispatch(setHatchFontColorShow());
  };

  const handelColorChange = (color) => {
    dispatch(setSelectedColor(color.hex));
    dispatch(setSelectedImage(null));
  };

  const handleHatchColorChange = (color) => {
    dispatch(setSelectedHatchColor(color.hex));
  };

  const handleHatchFontColorChange = (color) => {
    dispatch(setSelectedHatchFontColor(color.hex));
  };

  const handleHatchesNumber = (number) => {
    dispatch(setSelectedHatchesNumber(number));
  };

  const handleInputValue = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    dispatch(setInputValue(capitalizedValue));
  };

  return (
    <Row className="mainContent">
      <Col xs={2}>
        <Leftbar />
      </Col>
      <Col xs={10}>
        <Container className="text-center">
          <p className="header-crCAL">Create a Calendar</p>
          <p className="para">Choose a title</p>
          <Row>
            <div>
              <input placeholder="Enter the title" className="createTitleInput" type="text" onChange={handleInputValue} />
            </div>
          </Row>
          <p className="para ">Choose the number of hatches</p>
          <Row>
            <Form className="crCAL-form2">
              {["24", "28", "30", "31"].map((option, index) => (
                <Form.Check
                  key={`radio-${index}`}
                  inline
                  label={option}
                  name="group1"
                  type="radio"
                  id={`radio-${index}`}
                  className="radioButton"
                  onClick={() => handleHatchesNumber(option)}
                />
              ))}
            </Form>
          </Row>
          <p className="para">Choose the color theme</p>
          <Row className="justify-content-center">
            <Col style={{ maxWidth: "340px" }}>
              <div>
                <p className="colorOptionsTitle">Calendar background color:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  className="colorOptionsWrap"
                >
                  <input
                    className="colorOptionInput"
                    type="text"
                    placeholder={selectedColor}
                  />
                  <Button
                    className="arrowDownButton"
                    onClick={handleBackgroundColorClick}
                  >
                    <ArrowDown
                    />
                  </Button>
                  {colorShow && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <SketchPicker onChange={handelColorChange} />
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col style={{ maxWidth: "340px" }}>
              <div>
                <p className="colorOptionsTitle">Choose title Font:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  className="colorOptionsWrap"
                >
                  <input
                    className="colorOptionInput"
                    type="text"
                    placeholder={selectedTitleFont}
                  />
                  <Button
                    className="arrowDownButton"
                    onClick={handleTitleFontSelect}
                  >
                    <ArrowDown
                    />
                  </Button>
                  {titleFontShow && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <TitleFontPicker />
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col style={{ maxWidth: "340px" }}>
              <div>
                <p className="colorOptionsTitle">Choose Background Image:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  className="colorOptionsWrap"
                >
                  <input
                    className="colorOptionInput"
                    type="text"
                    placeholder={selectedImage}
                  />
                  <Button
                    className="arrowDownButton"
                    onClick={handleImageClick}
                  >
                    <ArrowDown

                    />
                  </Button>

                  {imageShow && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <ImagePicker />
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col style={{ maxWidth: "340px" }}>
              <div>
                <p className="colorOptionsTitle">Choose hatch background color:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    className="colorOptionInput"
                    type="text"
                    placeholder={selectedHatchColor}
                  />
                  <Button
                    className="arrowDownButton"
                    onClick={handleHatchColorSelect}
                  >
                    <ArrowDown
                    />
                  </Button>

                  {hatchColorShow && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <SketchPicker onChange={handleHatchColorChange} />
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col style={{ maxWidth: "340px" }}>
              <div>
                <p className="colorOptionsTitle">Choose hatch Font:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    className="colorOptionInput"
                    type="text"
                    placeholder={selectedFont}
                  />
                  <Button
                    className="arrowDownButton"
                    onClick={handleFontSelect}
                  >
                    <ArrowDown
                    />
                  </Button>

                  {fontShow && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <FontPicker />
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col style={{ maxWidth: "340px" }}>
              <div>
                <p className="colorOptionsTitle">Choose font color:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    className="colorOptionInput"
                    type="text"
                    placeholder={selectedHatchFontColor}
                    style={{
                      width: "188px",
                    }}
                  />
                  <Button
                    className="arrowDownButton"
                    onClick={handleHatchFontColorSelect}
                  >
                    <ArrowDown
                    />
                  </Button>

                  {hatchFontColorShow && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <SketchPicker onChange={handleHatchFontColorChange} />
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <div>
              <p className="para" style={{ marginTop: "50px" }}>
                Explore the calendar preview below and feel empowered to tweak
                it as you see fit.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "250px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "60px",
                  padding: "40px",
                  borderRadius: "10px",
                  backgroundColor: selectedColor,
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: "cover",
                  boxShadow: "0px 0px 5px 0px #0000005e"
                }}
              >
                <div
                  style={{
                    width: "auto",
                    height: "150px",
                    padding: "20px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    textTransform: "uppercase",
                    fontWeight: "600"
                  }}
                >
                  <p style={{
                    fontFamily: selectedTitleFont,
                    color: selectedHatchFontColor
                  }}>{inputValue}</p>
                </div>
                <div
                  style={{
                    width: "190px",
                    height: "150px",
                    backgroundColor: selectedHatchColor,
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 0px 5px 0px #0000005e"
                  }}
                >
                  <p
                    style={{
                      fontFamily: selectedFont,
                      color: selectedHatchFontColor,
                    }}
                  >
                    Hatch 1
                  </p>
                </div>
                <div
                  style={{
                    width: "190px",
                    height: "150px",
                    backgroundColor: selectedHatchColor,
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 0px 5px 0px #0000005e"
                  }}
                >
                  <p
                    style={{
                      fontFamily: selectedFont,
                      color: selectedHatchFontColor,
                    }}
                  >
                    Hatch 2
                  </p>
                </div>
                <div
                  style={{
                    width: "190px",
                    height: "150px",
                    backgroundColor: selectedHatchColor,
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 0px 5px 0px #0000005e"
                  }}
                >
                  <p
                    style={{
                      fontFamily: selectedFont,
                      color: selectedHatchFontColor,
                    }}
                  >
                    Hatch 3
                  </p>
                </div>
              </div>
            </div>
          </Row>
          <Link
            to={{
              pathname: "/edit-calendar",
            }}
          >
            <Button variant="light" type="submit" className="crCAL-button">
              Next
            </Button>
          </Link>
        </Container>
      </Col>
    </Row >
  );
}
