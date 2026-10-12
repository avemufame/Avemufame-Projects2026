import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

function Portfolio({ src, title, allImages = [], currentIndex = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <figure className="grid-item">
        <div
          onClick={() => setOpen(true)}
          style={{ overflow: 'hidden', borderRadius: '4px', cursor: 'pointer' }}
        >
          <img src={src} alt={title} loading="lazy" />
        </div>
        <figcaption>{title}</figcaption>
      </figure>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={allImages} 
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}

        on={{
          click: ({ target, currentTarget }) => {
            if (target === currentTarget) {
              setOpen(false);
            }
          }
        }}

        // FIX: Use slideContainer to wrap the native image instead of replacing it
        render={{
          slideContainer: ({ slide, children }) => {
            return (
              <div className="yarl__picture_container">
                {/* children renders the native library image with perfect sizing */}
                {children}
                
                {/* The overlay bar locked identically to the picture boundaries */}
                <div className="my-picture-attached-bar">
                  <h4>{slide.title}</h4>
                </div>
              </div>
            );
          }
        }}

        styles={{
          container: { backgroundColor: "rgba(10, 10, 10, 0.95)" }
        }}
      />

    </>
  );
}

export default Portfolio;
