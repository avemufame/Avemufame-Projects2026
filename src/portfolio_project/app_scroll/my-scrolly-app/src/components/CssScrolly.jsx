// src/CssScrolly.jsx
import React from 'react';

const CssScrolly = () => {
  return (
    <div className="scrolly-container">
      
      {/* SECTION 1 */}
      <section className="scroll-section">
        <div className="text-box">
          <h1>The Journey Begins</h1>
          <p>This section fades out as you scroll down.</p>
        </div>
        <div className="image-box">
          <img src="https://picsum.photos" alt="Scene 1" />
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="scroll-section">
        <div className="text-box">
          <h1>Connecting the Dots</h1>
          <p>This section automatically fades in and out based on its visibility.</p>
        </div>
        <div className="image-box">
          <img src="https://picsum.photos" alt="Scene 2" />
        </div>
      </section>

    </div>
  );
};

export default CssScrolly;
