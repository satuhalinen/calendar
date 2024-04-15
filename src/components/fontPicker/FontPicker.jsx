import { useState } from "react";
import "./fontPicker.css";

const FontPicker = ({ onFontSelect }) => {
  const [selectedFont, setSelectedFont] = useState("Lato");

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    onFontSelect(font);
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
            {fontOptions.map((font, index) => (
              <div
                key={index}
                className="font-option"
                style={{ fontFamily: font, borderRadius: "10px" }}
                onClick={() => handleFontSelect(font)}
              >
                {font}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontPicker;
