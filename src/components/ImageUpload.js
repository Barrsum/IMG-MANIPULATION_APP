import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const ImageUpload = ({ setImage }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    };
    loadModels();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
          const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
          if (detections.length > 0) {
            setImage(img.src);
          } else {
            alert("Uploaded image does not contain a face. Please try uploading an image with a face.");
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="button"
      >
        Choose File
      </button>
    </div>
  );
};

export default ImageUpload;