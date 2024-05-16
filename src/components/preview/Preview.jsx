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

  const selectedHatchesNumber = useSelector(
    (state) => state.calendarStyling.selectedHatchesNumber
  );

  const generatedImage = useSelector(
    (state) => state.calendarStyling.generatedImage
  );

  const hatches = Array.from({ length: selectedHatchesNumber }, (_, index) => `${index + 1}`);

  const backgroundImage = selectedImage || uploadedImage || generatedImage;

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
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "25px",
            borderRadius: "10px",
            backgroundColor: selectedColor,
            backgroundImage:
              backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0px 0px 5px 0px #0000005e",
            width: "80vw",
            height: "auto",
          }}
        >
          <p
            style={{
              fontFamily: selectedTitleFont,
              color: selectedHatchFontColor,
              fontSize: "1.5rem",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            {inputValue}
          </p>

          <Container
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gridAutoRows: "120px",
              gap: "20px",
            }}
          >
            {hatches.map((hatch, index) => (
              <Card
                key={index}
                className="text-center"
                style={{
                  backgroundColor: selectedHatchColor,
                  width: "100%",
                  boxShadow: "0px 0px 2px 0px #0000005e",
                  borderRadius: "7px",
                }}
              >
                <Card.Body>
                  <Card.Text
                    style={{
                      fontFamily: selectedFont,
                      color: selectedHatchFontColor,
                      fontSize: "1rem",
                    }}
                  >
                    {hatch}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Container>
        </Container>
      </Row>
    </Container>
  );
}