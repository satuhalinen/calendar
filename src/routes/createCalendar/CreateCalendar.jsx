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
    <Row className="main-row">
      <Col xs={2}>
        <Leftbar />
      </Col>
      <Col xs={10}>
        <Container className="text-center mx-auto">
          <h1 className="header-crCAL">Create a Calendar</h1>
          <p className="para">Choose a title</p>
          <Row>
            <div>
              <input type="text" onChange={handleInputValue} />
            </div>
          </Row>
          <p className="para">Choose free or not</p>
          <Row>
            <Form className="crCAL-form">
              {["Option 1", "Option 2"].map((option, index) => (
                <Form.Check
                  key={`radio-${index}`}
                  inline
                  label={option}
                  name="group1"
                  type="radio"
                  id={`radioButton-${index}`}
                  className="radioButton"
                />
              ))}
            </Form>
          </Row>
          <p className="para">Choose the color theme</p>
          <Row className="justify-content-center">
            <Col>
              <div>
                <p>Calendar background color:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder={selectedColor}
                    style={{
                      width: "188px",
                    }}
                  />
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid black",
                    }}
                    onClick={handleBackgroundColorClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleBackgroundColorClick();
                      }
                    }}
                  >
                    <ArrowDown />
                  </div>

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
            <Col>
              <div>
                <p>Choose title Font:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder={selectedTitleFont}
                    style={{
                      width: "188px",
                    }}
                  />
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid black",
                    }}
                    onClick={handleTitleFontSelect}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleTitleFontSelect();
                      }
                    }}
                  >
                    <ArrowDown />
                  </div>

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
            <Col>
              <div>
                <p>Choose Background Image:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder={selectedImage}
                    style={{
                      width: "188px",
                    }}
                  />
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid black",
                    }}
                    onClick={handleImageClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleImageClick();
                      }
                    }}
                  >
                    <ArrowDown />
                  </div>

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
            <Col>
              <div>
                <p> Hatch background color:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder={selectedHatchColor}
                    style={{
                      width: "188px",
                    }}
                  />
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid black",
                    }}
                    onClick={handleHatchColorSelect}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleHatchColorSelect();
                      }
                    }}
                  >
                    <ArrowDown />
                  </div>

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
            <Col>
              <div>
                <p>Hatch Font:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder={selectedFont}
                    style={{
                      width: "188px",
                    }}
                  />
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid black",
                    }}
                    onClick={handleFontSelect}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleFontSelect();
                      }
                    }}
                  >
                    <ArrowDown />
                  </div>

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
            <Col>
              <div>
                <p>Hatch font color:</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder={selectedHatchFontColor}
                    style={{
                      width: "188px",
                    }}
                  />
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid black",
                    }}
                    onClick={handleHatchFontColorSelect}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleHatchFontColorSelect();
                      }
                    }}
                  >
                    <ArrowDown />
                  </div>

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
              <p style={{ marginTop: "80px" }}>
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
                }}
              >
                <div
                  style={{
                    width: "250px",
                    height: "150px",
                    backgroundColor: "#BA824F",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontFamily: selectedTitleFont }}>{inputValue}</p>
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
          <p className="para ">Number of hatches</p>
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
    </Row>
  );
}
