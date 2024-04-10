import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import "./editHatch.css";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { saveAlternatives } from "../../store/alternativesSlice";
import { useDispatch } from "react-redux";

function EditHatch({ number }) {
  const alternatives = useSelector(
    (state) => state.alternatives.availableAlternatives
  );

  const [selectedTopic, setSelectedTopic] = useState(null);
  const dispatch = useDispatch();

  function saveAlternative(number, alternative) {
    dispatch(saveAlternatives({ number, alternative }));
  }

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
        <Dropdown.Item
          as="button"
          style={{ backgroundColor: "#F9F5F3" }}
          onClick={() => setSelectedTopic("adults")}
        >
          Adults
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          style={{ backgroundColor: "#F9F5F3" }}
          onClick={() => setSelectedTopic("animals")}
        >
          Animals
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton id="dropdown-item-button" title="Choose an alternative">
        {alternatives
          .filter((alternative) => alternative.id === selectedTopic)
          .flatMap((alternative) => alternative.alternatives)
          .map((alternative, index) => (
            <Dropdown.Item
              key={index}
              as="button"
              onClick={() => saveAlternative(number, alternative)}
              style={{ backgroundColor: "#F9F5F3" }}
            >
              {alternative}
            </Dropdown.Item>
          ))}
      </DropdownButton>
    </Card>
  );
}
export default EditHatch;
