import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUpload.css";

function FileUpload({ onFileAccepted }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Assuming only one file is needed
      const file = acceptedFiles[0];
      onFileAccepted(file);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <div {...getRootProps()} className="upload-area">
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

export default FileUpload;
