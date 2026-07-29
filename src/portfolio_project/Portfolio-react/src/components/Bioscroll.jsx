import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BioScrollytelling() {
  const containerRef = useRef(null);
  
  // 1. Track scroll progress of the bio section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // Starts drawing when top hits center, ends at bottom center
  });

  // 2. Map scroll progress to SVG stroke dash offset (draws the line)
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', padding: '100px 0' }}>
      
      {/* SVG Background Layer */}
      <svg 
        style={{ position: 'absolute', left: '20px', top: 0, width: '100px', height: '100%', zIndex: 0 }}
        viewBox="0 0 100 1000" 
        preserveAspectRatio="none"
      >
        {/* The Animated Line */}
        <motion.path
          d="M 50 0 L 50 300 Q 90 400 50 500 L 50 700 Q 10 800 50 900 L 50 1000" // Custom connecting path
          fill="none"
          stroke="#0070f3" // Line color
          strokeWidth="4"
          style={{ pathLength }} // Driven by scroll
        />
      </svg>

      {/* Bio Content Sections */}
      <div style={{ paddingLeft: '80px', height: '350px', position: 'relative', zIndex: 1 }}>
        <h3>2022 — The Spark</h3>
        <p>Started learning React and fell in love with interactive web design.</p>
      </div>

      <div style={{ paddingLeft: '80px', height: '350px', position: 'relative', zIndex: 1 }}>
        <h3>2024 — Deep Dive</h3>
        <p>Built complex web applications and mastered animation libraries.</p>
      </div>

      <div style={{ paddingLeft: '80px', height: '300px', position: 'relative', zIndex: 1 }}>
        <h3>Today — Open for Work</h3>
        <p>Looking for a frontend role where I can build creative scrollytelling experiences.</p>
      </div>

      

    </div>
  );
}
