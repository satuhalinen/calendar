import "./titleFontPicker.css";
import { useDispatch } from "react-redux";
import { setSelectedTitleFont } from "../../store/calendarStylingSlice";
import { Button } from "react-bootstrap";

const TitleFontPicker = () => {
  const dispatch = useDispatch();

  const handleFontSelect = (font) => {
    dispatch(setSelectedTitleFont(font));
  };

  const fontOptions = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Roboto",
    "Montserrat",
    "Lato",
    "Open Sans",
    "Roboto Condensed",
    "Roboto Slab",
    "Merriweather",
    "Playfair Display",
    "Oswald",
    "Raleway",
    "Nunito",
    "Poppins",
    "Ubuntu",
    "Lora",
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="font-picker-container"
          style={{ backgroundColor: "white" }}
        >
          <div
            style={{
              maxHeight: "290px",
              overflowY: "auto",
            }}
          >
            {fontOptions.map((font) => (
              <div
                key={font}
                className="font-option"
                style={{ fontFamily: font, borderRadius: "10px" }}
              >
                <Button
                  onClick={() => handleFontSelect(font)}
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    border: "none",
                  }}
                >
                  {font}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleFontPicker;
