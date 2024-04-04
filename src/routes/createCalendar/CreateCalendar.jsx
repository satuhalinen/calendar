import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Leftbar from "../../components/leftbar/Leftbar";
import { Button, Form } from "react-bootstrap";
import "./createCalendar.css";

export default function CreateCalendar() {
  const colorThemeOptions = [
    {
      label: "Option 1",
      type: "color",
      value: "#597773",
    },
    {
      label: "Option 2",
      type: "color",
      value: "#BD8048",
    },
    {
      label: "Option 3",
      type: "image",
      value:
        "https://images.pexels.com/photos/6101961/pexels-photo-6101961.jpeg?auto=compress&cs=tinysrgb&dpr=2",
    },
    {
      label: "Option 4",
      type: "image",
      value:
        "https://images.pexels.com/photos/158536/butterfly-common-blue-restharrow-polyommatus-icarus-158536.jpeg?auto=compress&cs=tinysrgb&dpr=2",
    },
  ];

  return (
    <Row className="main-row">
      <Col xs={2}>
        <Leftbar />
      </Col>
      <Col xs={10}>
        <Container className="text-center mx-auto">
          <h1 className="header-crCAL">Create a Calendar</h1>
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
            {colorThemeOptions.map((option, index) => (
              <Col key={`option-${index}`} xs={12} sm={6} md={4} lg={3}>

                <div className="d-flex flex-column  align-items-center">

           
                  <Form>
                    <Form.Check
                      inline
                      name="colorThemeGroup"
                      label={option.label}
                      type="radio"
                      id={`radioButton-${index}`}
                      className="radioButton"
                    />
                  </Form>
                  {option.type === "image" ? (
                    <div>
                      <img
                        className="optionImg"
                        src={option.value}
                        alt={option.label}
                      />
                    </div>
                  ) : (
                    <div className="crCAL-color-div">
                      <div
                        style={{
                          backgroundColor: option.value,
                          width: "184px",
                          height: "123px",
                          marginTop: "5px",
                          borderRadius: "5px",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </Col>
            ))}
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
                />
              ))}
            </Form>
          </Row>

          <Button variant="light" type="submit" className="crCAL-button">
            Create
          </Button>
        </Container>
      </Col>
    </Row>
  );
}
