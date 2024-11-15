"use client"
import React, { useState } from 'react';
import Questions from './topics.json';

function Page() {
  const [flipped, setFlipped] = useState(Array(9).fill(true));
  const [enlarged, setEnlarged] = useState(Array(9).fill(false));

  const handleCardClick = (index) => {
    const newFlipped = [...flipped];
    const newEnlarged = [...enlarged];
    newEnlarged[index] = !newEnlarged[index];
    if (newEnlarged[index]) {
      newFlipped[index] = false; // Show front when enlarged
    } else {
      newFlipped[index] = true; // Show back when not enlarged
    }
    setFlipped(newFlipped);
    setEnlarged(newEnlarged);
  };

  const handleClose = (index) => {
    const newEnlarged = [...enlarged];
    const newFlipped = [...flipped];
    newEnlarged[index] = false;
    newFlipped[index] = true; // Show back when closed
    setEnlarged(newEnlarged);
    setFlipped(newFlipped);
  };

  return (
    <div className='center'>
      <div className="canvas-container">
        <div className='title-container'>
          <h1>Make Your Choices</h1>
        </div>
        <div className='card-container'>
          {flipped.map((isFlipped, index) => (
            <div
              key={index}
              className={`card card-${index+1} ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              {isFlipped ? 'Back' : index + 1}
            </div>
          ))}
        </div>
        {enlarged.map((isEnlarged, index) => (
          isEnlarged && (
            <div key={index} className="modal" onClick={() => handleClose(index)}>
              <div className="modal-content">
                <div
                  className={`card enlarged card-enlarged-${index+1} ${flipped[index] ? 'flipped' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="card-content">
                    <p>{Questions[index].question}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default Page;