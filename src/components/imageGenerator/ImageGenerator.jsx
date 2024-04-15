import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Calendar from "../../routes/Calendar";

const ImageGenerator = () => {
  const generatedImageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    generateImage();
  }, []);

  const generateImage = async () => {
    if (!generatedImageRef.current) return;

    const scaleValue = 2;
    const originalTransform = generatedImageRef.current.style.transform;
    generatedImageRef.current.style.transform = `scale(${scaleValue})`;

    const canvas = await html2canvas(generatedImageRef.current, {
      scrollY: -window.scrollY,
    });

    generatedImageRef.current.style.transform = originalTransform;

    const url = canvas.toDataURL();
    setImageUrl(url);
  };

  return (
    <div style={{ width: "200px", height: "100px", overflow: "hidden" }}>
      <div
        ref={generatedImageRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          top: "-200px",
        }}
      >
        <Calendar style={{ transform: "scale:1.5" }} />
      </div>
    </div>
  );
};

export default ImageGenerator;
