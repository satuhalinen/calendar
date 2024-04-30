import { Card, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./preview.css";

export default function Preview() {
  const uploadedImage = useSelector(
    (state) => state.calendarStyling.uploadedImage
  );
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
  const inputValue = useSelector((state) => state.calendarStyling.inputValue);

  const hatches = ["Hatch 1", "Hatch 2", "Hatch 3"];

  return (
    <Container>
      <Row className="justify-content-center">
        <Container>
          <p className="prev-para">
            Explore the calendar preview below and feel empowered to tweak it as
            you see fit.
          </p>
        </Container>
      </Row>
      <Row className="justify-content-center">
        <Container
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "60px",
            padding: "40px",
            borderRadius: "10px",
            backgroundColor: selectedColor,
            backgroundImage:
              selectedImage !== null
                ? `url(${selectedImage})`
                : `url(${uploadedImage})`,
            backgroundSize: "cover",
            boxShadow: "0px 0px 5px 0px #0000005e",
            width: "75vw",
          }}
        >
          <Container
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
              fontWeight: "600",
            }}
          >
            <p
              style={{
                fontFamily: selectedTitleFont,
                color: selectedHatchFontColor,
              }}
            >
              {inputValue}
            </p>
          </Container>

          {hatches.map((hatch, index) => (
            <Card
              key={index}
              className="text-center"
              style={{
                backgroundColor: selectedHatchColor,
                width: "18rem",
                boxShadow: "0px 0px 5px 0px #0000005e",
                borderRadius: "10px",
              }}
            >
              <Card.Body>
                <Card.Text
                  style={{
                    fontFamily: selectedFont,
                    color: selectedHatchFontColor,
                    marginTop: "2.8rem",
                  }}
                >
                  {hatch}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </Row>
    </Container>
  );
}
