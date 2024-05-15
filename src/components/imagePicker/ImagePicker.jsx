import "./imagePicker.css";
import {
  setSelectedImage,
  setSelectedColor,
  setUploadedImage,
  setSelectedHatchColor,
  setGeneratedImage
} from "../../store/calendarStylingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const ImagePicker = () => {
  const images = [
    "https://images.pexels.com/photos/461049/pexels-photo-461049.jpeg",
    "https://images.pexels.com/photos/3013675/pexels-photo-3013675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7474089/pexels-photo-7474089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/9543745/pexels-photo-9543745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7656992/pexels-photo-7656992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2887566/pexels-photo-2887566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const dispatch = useDispatch();

  const selectedHatchColor = useSelector(
    (state) => state.calendarStyling.selectedHatchColor
  );

  const handleImageClick = (imageUrl) => {
    const transparentHatch = selectedHatchColor + "00";
    if (selectedHatchColor && selectedHatchColor.endsWith("00")) {
      dispatch(setSelectedHatchColor(selectedHatchColor));
    } else {
      dispatch(setSelectedHatchColor(transparentHatch));
    }
    dispatch(setSelectedImage(imageUrl));
    dispatch(setGeneratedImage(null));
    dispatch(setSelectedColor(null));
    dispatch(setUploadedImage(null));
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
