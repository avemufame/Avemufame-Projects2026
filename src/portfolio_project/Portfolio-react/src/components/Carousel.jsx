import React, { useState, useEffect } from "react";
import "../styles/Carousel.css"; 
/*
const portfolioItems = [
  { id: 1, src: "/src/assets/gallery/AristoPenuat.png", title: "Project one" },
  { id: 2, src: "/src/assets/gallery/basketItemPreview.jpeg", title: "Project two" },
  { id: 3, src: "/src/assets/gallery/Brighton_view.jpg", title: "Project 3" },
  { id: 4, src: "/src/assets/gallery/AristoPenuat.png", title: "Project one" },
  { id: 5, src: "/src/assets/gallery/basketItemPreview.jpeg", title: "Project two" },
  { id: 6, src: "/src/assets/gallery/Brighton_view.jpg", title: "Project 3" },
  { id: 7, src: "/src/assets/gallery/AristoPenuat.png", title: "Project one" },
  { id: 8, src: "/src/assets/gallery/basketItemPreview.jpeg", title: "Project two" },
  { id: 9, src: "/src/assets/gallery/Brighton_view.jpg", title: "Project 3" },
  // Tip: Add more items here to fill up your long line!
]; */

export default function Carousel({ carouselItems }) {
  const portfolioItems = carouselItems || [];

  // Initialize the shuffled array directly inside the state once to avoid dependency loops
  const [shuffledItems] = useState(() => {
    return [...portfolioItems]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); 

  // --- SWIPE & DRAG CONFIGURATION ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const minSwipeDistance = 50; // Minimum drag distance in pixels to trigger a slide shift

  // We want to show 4 pictures at once on desktop layouts
  const itemsToShow = 4; 
  // Max index we can scroll to before running out of items on the right side
  const maxIndex = Math.max(0, shuffledItems.length - itemsToShow);

  // Auto-scroll loop interval timer
  useEffect(() => {
    if (shuffledItems.length <= itemsToShow || isPaused || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, [shuffledItems.length, maxIndex, isPaused, isDragging]);

  // --- SWIPE UTILITY MATH LOGIC ---
  const handleSwipeExecute = (start, end) => {
    if (!start || !end) return;
    const distance = start - end;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Touch Handlers for Phones
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches.clientX);
  };
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches.clientX);
  const handleTouchEnd = () => handleSwipeExecute(touchStart, touchEnd);

  // Mouse Handlers for Desktop Grabbing
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    handleSwipeExecute(touchStart, touchEnd);
  };

  if (shuffledItems.length === 0) return null;

  // Calculate the percentage width of each individual small item
  const itemWidthPercent = 100 / itemsToShow;

  return (
    <div 
      className={`carousel-container ${isDragging ? "grabbing" : ""}`}
      onMouseEnter={() => setIsPaused(true)}  
      onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }} 
      // Attached drag & swipe bindings
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div 
        className="carousel-track" 
        style={{ transform: `translateX(-${currentIndex * itemWidthPercent}%)` }}
      >
        {shuffledItems.map((item, index) => (
          <div className="carousel-slide" key={item.id || index}>
            {/* Added styling wrapper attributes to prevent native browser image-dragging conflicts */}
            <div className="image-wrapper" onDragStart={(e) => e.preventDefault()}>
              <img src={item.src} alt={item.title} draggable="false" />
              <div className="carousel-caption">
                <h3>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dots only need to show up for the available scroll steps */}
      {shuffledItems.length > itemsToShow && (
        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
