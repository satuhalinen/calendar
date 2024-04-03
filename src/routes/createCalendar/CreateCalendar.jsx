import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Leftbar from "../../components/leftbar/Leftbar";
import { Button, Form } from "react-bootstrap";
import "./createCalendar.css";

export default function CreateCalendar() {
  const colorThemeOptions = [
    {
      label: "Option1",
      type: "color",
      value: "#FF5733",
    },
    {
      label: "Option2",
      type: "color",
      value: "#3366FF",
    },
    {
      label: "Option3",
      type: "image",
      value:
        "https://images.pexels.com/photos/6101961/pexels-photo-6101961.jpeg?auto=compress&cs=tinysrgb&dpr=2",
    },
    {
      label: "Option4",
      type: "image",
      value:
        "https://images.pexels.com/photos/158536/butterfly-common-blue-restharrow-polyommatus-icarus-158536.jpeg?auto=compress&cs=tinysrgb&dpr=2",
    },
  ];

  return (
    <Row>
      <Col xs={2}>
        <Leftbar />
      </Col>
      <Col xs={10}>
        <Container className="text-center mx-auto">
          <h1>Create a Calendar</h1>
          <p className="para">Choose free or not</p>
          <Row>
            <Form>
              <div className="mb-3">
                {["Option 1", "Option 2"].map((option, index) => (
                  <Form.Check
                    key={`radio-${index}`}
                    inline
                    label={option}
                    name="group1"
                    type="radio"
                    id={`radioButton-${index}`}
                  />
                ))}
              </div>
            </Form>
          </Row>
          <p className="para">Choose the color theme</p>
          <Row>
            {colorThemeOptions.map((option, index) => (
              <Col key={`option-${index}`}>
                <Container
                  fluid
                  className="text-center mx-auto colorTheme-container "
                >
                  <Form>
                    <Form.Check
                      inline
                      name="colorThemeGroup"
                      label={option.label}
                      type="radio"
                      id={`radioButton-${index}`}
                    />
                  </Form>
                  {option.type === "image" ? (
                    <Container>
                      <img className="optionImg" src={option.value} alt={option.label} />
                    </Container>
                  ) : (
                    <Container>
                      <div
                        style={{
                          backgroundColor: option.value,
                          width: "150px",
                          height: "150px",
                          marginTop: "5px",
                          marginLeft: "30px",
                        }}
                      ></div>
                    </Container>
                  )}
                </Container>
              </Col>
            ))}
          </Row>
          <p className="para numbers">Number of hatches</p>
          <Row>
            <Form>
              <div className="mb-3">
                {["24", "28", "30", "31"].map((option, index) => (
                  <Form.Check
                    key={`radio-${index}`}
                    inline
                    label={option}
                    name="group1"
                    type="radio"
                    id={`radio-${index}`}
                    style={{ paddingRight: "100px" }}
                  />
                ))}
              </div>
            </Form>
          </Row>

          <Button className="button">Create</Button>
        </Container>
      </Col>
    </Row>
  );
}
