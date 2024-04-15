import "./imagePicker.css";

const FontPicker = ({ ImageSelect }) => {
  const images = [
    " https://images.pexels.com/photos/1451040/pexels-photo-1451040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/10916301/pexels-photo-10916301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/998067/pexels-photo-998067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/6897427/pexels-photo-6897427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1280169/pexels-photo-1280169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const handleImageClick = (imageUrl) => {
    ImageSelect(imageUrl);
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
              <img
                key={index}
                src={imageUrl}
                alt={`Background ${index + 1}`}
                style={{
                  width: "200px",
                  height: "150px",
                  margin: "5px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
                className="image-hover-effect"
                onClick={() => handleImageClick(imageUrl)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontPicker;
