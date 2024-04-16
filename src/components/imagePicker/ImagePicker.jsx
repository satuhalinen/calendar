import "./imagePicker.css";
import {
  setSelectedImage,
  setSelectedColor,
} from "../../store/calendarStylingSlice";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

const ImagePicker = () => {
  const images = [
    " https://images.pexels.com/photos/1451040/pexels-photo-1451040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/10916301/pexels-photo-10916301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/998067/pexels-photo-998067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/6897427/pexels-photo-6897427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1280169/pexels-photo-1280169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const dispatch = useDispatch();

  const handleImageClick = (imageUrl) => {
    dispatch(setSelectedImage(imageUrl));
    dispatch(setSelectedColor(null));
  };

  return (
    <div>
      <div>
        <div
          className="font-picker-container"
          style={{ backgroundColor: "white" }}
        >
          <div style={{ maxHeight: "290px", overflowY: "auto" }}>
            {images.map((imageUrl, index) => (
              <Button
                key={imageUrl}
                style={{
                  backgroundColor: "transparent",
                  width: "200px",
                  height: "150px",
                  padding: "0px",
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  border: "none",
                  margin: "2px",
                }}
                onClick={() => handleImageClick(imageUrl)}
              ></Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;
