import { DropdownButton, Dropdown } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { saveAlternatives } from "../../store/alternativesSlice";
import "./editHatch.css";

function EditHatch({ number }) {
  const alternatives = useSelector(
    (state) => state.alternatives.availableAlternatives
  );

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedAlternative, setSelectedAlternative] = useState(null);

  const dispatch = useDispatch();

  function saveAlternative(number, alternative, topic) {
    dispatch(saveAlternatives({ number, alternative, topic }));
  }

  const backgroundColor = useSelector(
    (state) => state.calendarStyling.selectedHatchColor
  );

  const hatchFontColor = useSelector(
    (state) => state.calendarStyling.selectedHatchFontColor
  );

  const hatchFont = useSelector((state) => state.calendarStyling.selectedFont);

  const handleRandomize = () => {
    const randomTopic =
      alternatives[Math.floor(Math.random() * alternatives.length)];
    setSelectedTopic(randomTopic.id);

    const randomIndex = Math.floor(Math.random() * randomTopic.content.length);
    const randomAlternative = randomTopic.content[randomIndex];
    setSelectedAlternative(randomAlternative);

    saveAlternative(number, randomAlternative, randomTopic.id);
  };

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
        id="dropdown-topic-button"
        title={selectedTopic ? selectedTopic : "Choose a topic"}
        style={{ backgroundColor: backgroundColor }}
      >
        {["Adults", "Animals", "Children and teenagers", "Elderly"].map(
          (topic) => (
            <Dropdown.Item
              key={topic}
              as="button"
              style={{
                backgroundColor:
                  selectedTopic === topic ? "lightgrey" : "#F9F5F3",
              }}
              className="dropdownTopic"
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </Dropdown.Item>
          )
        )}
      </DropdownButton>
      <DropdownButton
        id="dropdown-alternative-button"
        title={
          selectedAlternative
            ? selectedAlternative.title
            : "Choose an alternative"
        }
        style={{ backgroundColor: backgroundColor }}
      >
        {alternatives
          .filter((topic) => topic.id === selectedTopic)
          .flatMap((topic) => topic.content)
          .map((alternative, index) => (
            <Dropdown.Item
              key={index}
              as="button"
              onClick={() => {
                setSelectedAlternative(alternative);
                saveAlternative(number, alternative, selectedTopic);
              }}
              style={{
                backgroundColor:
                  selectedAlternative === alternative ? "lightgrey" : "#F9F5F3",
                fontFamily: hatchFont,
                color: "grey",
              }}
              className="dropdownItem"
            >
              {alternative.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>
      <button className="randomizeButton" onClick={handleRandomize}>
        Randomize
      </button>
    </Card>
  );
}
export default EditHatch;
