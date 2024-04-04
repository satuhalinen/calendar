import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import "./editHatch.css";
import { Card } from "react-bootstrap";

function EditHatch({ number }) {
  return (
    <Card
      style={{
        width: "80%",
        height: "80%",
        backgroundColor: "#F9F5F3",
      }}
    >
      <div className="hatch">{number}</div>
      <DropdownButton id="dropdown-item-button" title="Choose a topic">
        <Dropdown.Item as="button" style={{ backgroundColor: "#F9F5F3" }}>
          Adults
        </Dropdown.Item>
        <Dropdown.Item as="button" style={{ backgroundColor: "#F9F5F3" }}>
          Animals
        </Dropdown.Item>
        <Dropdown.Item as="button" style={{ backgroundColor: "#F9F5F3" }}>
          Children and teenagers
        </Dropdown.Item>
        <Dropdown.Item as="button" style={{ backgroundColor: "#F9F5F3" }}>
          Elderly
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton id="dropdown-item-button" title="Choose an alternative">
        <Dropdown.Item as="button" style={{ backgroundColor: "#F9F5F3" }}>
          Alternative 1
        </Dropdown.Item>
        <Dropdown.Item as="button" style={{ backgroundColor: "#F9F5F3" }}>
          Alternative 2
        </Dropdown.Item>
        <Dropdown.Item as="button" style={{ backgroundColor: "#F9F5F3" }}>
          Alternative 3
        </Dropdown.Item>
        <Dropdown.Item as="button" style={{ backgroundColor: "#F9F5F3" }}>
          Alternative 4
        </Dropdown.Item>
      </DropdownButton>
    </Card>
  );
}
export default EditHatch;
