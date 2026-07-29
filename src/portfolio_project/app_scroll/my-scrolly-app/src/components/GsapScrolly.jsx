import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GsapScrolly = () => {
  const containerRef = useRef();
useGSAP(() => {
  // 1. Force a refresh to ensure ScrollTrigger calculates the page height correctly
  ScrollTrigger.refresh();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",     
      end: "+=3000",        // This creates 3000px of scrolling space
      scrub: 1,             
      pin: true,            
      anticipatePin: 1,
      invalidateOnRefresh: true // Fixes resize/strict mode glitches
    }
  });

  // Ensure elements are animated properly
  tl.to(".text-1", { opacity: 0, y: -50, duration: 1 })
    .to(".img-1", { opacity: 0, scale: 0.9, duration: 1 }, "<") 
    .to(".img-2", { opacity: 1, scale: 1, duration: 1 }, "<") // Changed from .from to .to for strict mode stability
    .to(".text-2", { opacity: 1, y: 0, duration: 1 }, "<")

    .to(".line-path", { strokeDashoffset: 0, duration: 1.5 })

    .to(".text-2", { opacity: 0, y: -50, duration: 1 })
    .to(".img-2", { opacity: 0, scale: 0.9, duration: 1 }, "<")
    .to(".img-3", { opacity: 1, scale: 1, duration: 1 }, "<")
    .to(".text-3", { opacity: 1, y: 0, duration: 1 }, "<");

  // Cleanup function to prevent StrictMode duplicates
  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, { scope: containerRef });


  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh', background: '#0b0b0b', color: '#fff', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. TEXT CONTAINER (Left Side) */}
      <div style={{ position: 'absolute', left: '10%', top: '40%', width: '35%', zIndex: 10 }}>
        
        <div className="text-1" style={{ position: 'absolute', top: 0, left: 0 }}>
          <h1 style={{ fontSize: '3rem', margin: 0 }}>The ney Begins</h1>
          <p style={{ color: '#aaa' }}>This is your first story block. Scroll down to see the magic happen.</p>
        </div>

        <div className="text-2" style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}>
          <h1 style={{ fontSize: '3rem', margin: 0 }}>Connecting the Dots</h1>
          <p style={{ color: '#aaa' }}>The line appears to bridge the gap between your ideas.</p>
        </div>

        <div className="text-3" style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}>
          <h1 style={{ fontSize: '3rem', margin: 0 }}>The Final Destination</h1>
          <p style={{ color: '#aaa' }}>The narrative wraps up beautifully with a final visual transition.</p>
        </div>

      </div>

      {/* 2. SVG LINE CONTAINER (Centred overlay) */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
        <path 
          className="line-path"
          d="M 100 500 Q 400 200 800 500 T 1400 300" // Custom SVG path coordinates
          fill="none" 
          stroke="#ff0055" 
          strokeWidth="4"
          strokeDasharray="2000" // Should match or exceed the path length
          strokeDashoffset="2000" // Hidden by default
        />
      </svg>

      {/* 3. PICTURES CONTAINER (Right Side) */}
      <div style={{ position: 'absolute', right: '10%', top: '20%', width: '40%', height: '60%', zIndex: 2 }}>
        
        {/* Image 1 */}
        <img 
          className="img-1" 
          src="https://picsum.photos" 
          alt="Scene 1"
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
        />

        {/* Image 2 */}
        <img 
          className="img-2" 
          src="https://picsum.photos" 
          alt="Scene 2"
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', opacity: 0 }}
        />

        {/* Image 3 */}
        <img 
          className="img-3" 
          src="https://picsum.photos" 
          alt="Scene 3"
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', opacity: 0 }}
        />

      </div>

    </div>
  );
};

export default GsapScrolly;
