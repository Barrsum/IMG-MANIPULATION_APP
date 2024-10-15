import React from 'react';

const BackgroundSelection = ({ setCurrentBackground }) => {
  const backgrounds = [
    '/backgrounds/bg1.jpg',
    '/backgrounds/bg2.jpg',
    '/backgrounds/bg3.jpg',
    '/backgrounds/bg4.jpg',
    '/backgrounds/bg5.jpg',
  ];

  return (
    <div className="background-selection">
      <h2>Select Background</h2>
      <div className="background-images">
        {backgrounds.map((bg, index) => (
          <img
            key={index}
            src={bg}
            alt={`Background ${index + 1}`}
            onClick={() => setCurrentBackground(bg)}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelection;