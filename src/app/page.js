"use client"
import React, { useState } from 'react';
import Questions from './topics.json';

function Page() {
  const [flipped, setFlipped] = useState(Array(9).fill(true));
  const [enlarged, setEnlarged] = useState(Array(9).fill(false));
  const [clicked, setClicked] = useState(Array(9).fill(false)); // 新增狀態來追蹤卡片是否已被點擊過

  const handleCardClick = (index) => {
    if (clicked[index]) return; // 如果卡片已被點擊過，則返回

    const newFlipped = [...flipped];
    const newEnlarged = [...enlarged];
    const newClicked = [...clicked]; // 複製 clicked 狀態

    newEnlarged[index] = !newEnlarged[index];
    if (newEnlarged[index]) {
      newFlipped[index] = false;
    } else {
      newFlipped[index] = true;
    }
    newClicked[index] = true; // 設置卡片為已點擊

    setFlipped(newFlipped);
    setEnlarged(newEnlarged);
    setClicked(newClicked); // 更新 clicked 狀態
  };

  const handleClose = (index) => {
    const newEnlarged = [...enlarged];
    newEnlarged[index] = false;
    setEnlarged(newEnlarged);
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