import React, { useState, useEffect } from "react";

const FileUploader = ({ onFileUpload }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      onFileUpload(file);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </div>
  );
};

export default FileUploader;
