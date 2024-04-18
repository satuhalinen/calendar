import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const ImageGenerator = () => {
  const toCaptureRef = useRef(null);
  const [imageURL, setImageURL] = useState(null);

  const captureScreenshot = () => {
    if (!toCaptureRef.current) return;

    const canvasPromise = html2canvas(toCaptureRef.current, {
      useCORS: true
    });

    canvasPromise.then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      setImageURL(dataURL);
    });
  };

  return (
    <div ref={toCaptureRef}>
      <h1>Hello hello</h1>
      <img
        alt="temp"
        style={{ width: "500px" }}
        src="https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <button onClick={captureScreenshot}>ScreenShot</button>

      {/* Render the captured image if available */}
      {imageURL && <img src={imageURL} alt="Captured" />}
    </div>
  );
};

export default ImageGenerator;
