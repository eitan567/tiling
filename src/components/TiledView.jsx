import React, { useState, useEffect, useCallback } from "react";
import PanZoom from "react-easy-panzoom";
import { useDropzone } from "react-dropzone";

function TiledView({ image, onImageChange }) {
  const [backgroundSize, setBackgroundSize] = useState("100px 100px"); // Default size

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setBackgroundSize(
          `${img.naturalWidth / 3}px ${img.naturalHeight / 3}px`
        );
      };
    }
  }, [image]); // This effect runs only when the image changes

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true, // Prevents the dropzone from opening the file dialog when clicked
    accept: "image/jpeg, image/png",
  });

  // Prevent default click behavior
  const onClick = (event) => event.stopPropagation();

  return (
    <div
      {...getRootProps({ onClick })}
      style={{
        position: "relative",
        height: "calc(100vh - 100px)",
        width: "100%",
      }}
    >
      <input {...getInputProps()} />
      <PanZoom
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid black",
          overflow: "hidden",
        }}
        minZoom={0.5}
        maxZoom={4}
        boundaryRatioVertical={0.8}
        boundaryRatioHorizontal={0.8}
      >
        <div
          style={{
            width: "2000px",
            height: "2000px",
            backgroundImage: `url(${image})`,
            backgroundSize: backgroundSize,
            backgroundRepeat: "repeat",
          }}
        >
          {/* This div now tiles the background image */}
        </div>
      </PanZoom>
    </div>
  );
}

export default TiledView;
