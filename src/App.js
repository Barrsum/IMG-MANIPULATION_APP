import React, { useState, useRef } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';
import FilterButtons from './components/FilterButtons';
import BackgroundSelection from './components/BackgroundSelection';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('none');
  const [currentBackground, setCurrentBackground] = useState(null);
  const canvasRef = useRef(null);

  const removeBackground = async () => {
    if (!image) return;

    const apiKey = '5c6wM57Ri8rzkMwWMgQUyMve'; // Replace with your actual API key
    const formData = new FormData();
    formData.append('image_file', await fetch(image).then(r => r.blob()), 'image.jpg');

    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImage(url);
      } else {
        console.error('Error removing background:', await response.text());
      }
    } catch (error) {
      console.error('Error removing background:', error);
    }
  };

  const saveImage = () => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (currentBackground) {
        const bgImg = new Image();
        bgImg.onload = () => {
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
          drawMainImage();
        };
        bgImg.src = currentBackground;
      } else {
        drawMainImage();
      }
    };
    img.src = image;

    function drawMainImage() {
      ctx.filter = getFilterStyle(currentFilter);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.download = 'filtered_image.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const clearImage = () => {
    setImage(null);
    setCurrentFilter('none');
    setCurrentBackground(null);
  };

  const getFilterStyle = (filter) => {
    switch (filter) {
      case 'grayscale':
        return 'grayscale(100%)';
      case 'sepia':
        return 'sepia(100%)';
      case 'invert':
        return 'invert(100%)';
      case 'blur':
        return 'blur(5px)';
      case 'brightness':
        return 'brightness(150%)';
      case 'contrast':
        return 'contrast(200%)';
      default:
        return 'none';
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Image Upload and Filter</h1>
      </header>
      <main className="main">
        <div className="sidebar">
          <ImageUpload setImage={setImage} />
          <FilterButtons setCurrentFilter={setCurrentFilter} />
          <BackgroundSelection setCurrentBackground={setCurrentBackground} />
          <button onClick={removeBackground} className="button">Remove Background</button>
          <button onClick={saveImage} className="button">Save Image</button>
          <button onClick={clearImage} className="button">Clear Image</button>
        </div>
        <div className="content">
          <ImageDisplay image={image} currentFilter={currentFilter} currentBackground={currentBackground} />
        </div>
      </main>
      <footer className="footer">
        <p>Thank you for using our Image Upload and Filter!</p>
      </footer>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};
export default App;

// Made By Ram Bapat +91 9691632158