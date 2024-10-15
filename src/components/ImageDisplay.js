import React from 'react';

const ImageDisplay = ({ image, currentFilter, currentBackground }) => {
  const getFilterStyle = () => {
    switch (currentFilter) {
      case 'grayscale':
        return { filter: 'grayscale(100%)' };
      case 'sepia':
        return { filter: 'sepia(100%)' };
      case 'invert':
        return { filter: 'invert(100%)' };
      case 'blur':
        return { filter: 'blur(5px)' };
      case 'brightness':
        return { filter: 'brightness(150%)' };
      case 'contrast':
        return { filter: 'contrast(200%)' };
      default:
        return {};
    }
  };

  const containerStyle = {
    backgroundImage: currentBackground ? `url(${currentBackground})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const imageStyle = {
    ...getFilterStyle(),
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
  };

  return (
    <div className="image-display" style={containerStyle}>
      {image ? (
        <img
          src={image}
          alt="Uploaded"
          style={imageStyle}
        />
      ) : (
        <p>Upload an image to see it here</p>
      )}
      <div className="current-filter">Current Filter: {currentFilter}</div>
    </div>
  );
};

export default ImageDisplay;