import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import "./editHatch.css";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { saveAlternatives } from "../../store/alternativesSlice";

function EditHatch({ number }) {
  const alternatives = useSelector(
    (state) => state.alternatives.availableAlternatives
  );

  const [selectedTopic, setSelectedTopic] = useState(null);
  const dispatch = useDispatch();

  function saveAlternative(number, alternative) {
    dispatch(saveAlternatives({ number, alternative }));
  }

  // hatch styling

  const backgroundColor = useSelector(
    (state) => state.calendarStyling.selectedHatchColor
  );

  const hatchFontColor = useSelector(
    (state) => state.calendarStyling.selectedHatchFontColor
  );

  const hatchFont = useSelector((state) => state.calendarStyling.selectedFont);

  return (
    <Card
      style={{
        width: "90%",
        height: "100%",
        backgroundColor: backgroundColor,
      }}
      className="hatchCard"
    >
      <div className="hatch" style={{ color: hatchFontColor }}>
        {number}
      </div>
      <DropdownButton
        id="dropdown-item-button"
        title="Choose a topic"
        style={{ backgroundColor: backgroundColor }}
      >
        <Dropdown.Item
          as="button"
          style={{
            backgroundColor: "#F9F5F3",
          }}
          className="dropdownTopic"
          onClick={() => setSelectedTopic("Adults")}
        >
          Adults
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          style={{
            backgroundColor: "#F9F5F3",
          }}
          className="dropdownTopic"
          onClick={() => setSelectedTopic("Animals")}
        >
          Animals
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton id="dropdown-item-button" title="Choose an alternative">
        {alternatives
          .filter((alternative) => alternative.id === selectedTopic)
          .flatMap((alternative) => alternative.content)
          .map((alternative) => alternative.title)
          .map((alternative, index) => (
            <Dropdown.Item
              key={index}
              as="button"
              onClick={() => saveAlternative(number, alternative)}
              style={{
                backgroundColor: "#F9F5F3",
                fontFamily: hatchFont,
                color: hatchFontColor,
              }}
              className="dropdownItem"
            >
              {alternative}
            </Dropdown.Item>
          ))}
      </DropdownButton>
    </Card>
  );
}
export default EditHatch;
