import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import '../styles/portfolio.css'; // Carica i tuoi stili CSS originali

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SketchGallery2() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      const { data } = await supabase
        .from('projects')
        .select(`
          id, 
          title, 
          description, 
          category,
          project_steps (
            step_number,
            image_url,
            caption
          )
        `)
        .eq('category', 'sketches');
      
      if (data) setList(data);
      setLoading(false);
    }
    
    fetchContent();
  }, []); 

  const getLightboxSlides = () => {
    if (activeProjectIndex === null || !list[activeProjectIndex]) return [];
    
    const project = list[activeProjectIndex];
    const steps = [...project.project_steps].sort((a, b) => a.step_number - b.step_number);

    return steps.map((step) => ({
      src: step.image_url,
      projectTitle: project.title,
      projectDescription: project.description,
      stepCaption: step.caption || `Step ${step.step_number} di ${steps.length}`
    }));
  };

  const slides = getLightboxSlides();
  const currentSlide = slides[slideIndex];

  const handleClose = () => setActiveProjectIndex(null);

  return (
    <div className="main">
      <h1>Sketches</h1>
      
      <div className="portfolio-grid">
        {loading ? (
          [220, 160, 260, 180, 240, 200].map((height, index) => (
            <div 
              key={index} 
              className="skeleton-card skeleton-pulse" 
              style={{ height: `${height}px` }} 
            />
          ))
        ) : (
          list.map((item, projectIdx) => {
            const sortedSteps = item.project_steps 
              ? [...item.project_steps].sort((a, b) => a.step_number - b.step_number)
              : [];

            return (
              <div key={item.id} className="grid-item">
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  overflowX: 'auto', 
                  paddingBottom: '10px',
                  scrollbarWidth: 'thin'
                }}>
                  {sortedSteps.map((step, stepIdx) => (
                    <img 
                      key={step.step_number}
                      src={step.image_url} 
                      alt={`${item.title} - Step ${step.step_number}`} 
                      onClick={() => {
                        setActiveProjectIndex(projectIdx);
                        setSlideIndex(stepIdx);
                      }}
                      style={{ 
                        maxHeight: '180px', 
                        width: 'auto',
                        borderRadius: '6px', 
                        objectFit: 'cover',
                        cursor: 'pointer',
                        flexShrink: 0 
                      }} 
                    />
                  ))}
                </div>
    
                <figcaption style={{ textAlign: 'left', marginTop: '8px' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#262626', fontWeight: '600' }}>
                    {item.title}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#8e8e8e' }}>
                    {sortedSteps.length} {sortedSteps.length === 1 ? 'immagine' : 'immagini'}
                  </span>
                </figcaption>
              </div>
            );
          })
        )}
      </div>

      {activeProjectIndex !== null && (
        <Lightbox
          open={activeProjectIndex !== null}
          index={slideIndex}
          close={handleClose}
          controller={{ closeOnBackdropClick: true }}
          on={{ view: ({ index }) => setSlideIndex(index) }}
          slides={slides}
          plugins={[Zoom]}
          animation={{ zoom: 300 }}
          zoom={{ maxZoomPixelRatio: 3 }}
          
          styles={{
            container: { backgroundColor: "rgba(10, 10, 10, 0.9)" },
            root: {
              maxWidth: isMobile ? "100%" : "950px",
              maxHeight: isMobile ? "100%" : "75vh",
              margin: "auto",
              borderRadius: isMobile ? "0" : "12px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              pointerEvents: "auto" 
            },
            slide: { 
              paddingRight: isMobile ? "0px" : "320px",
              boxSizing: "border-box",
              cursor: "default"
            }
          }}

          render={{
            // Rimosso l'override che nascondeva i pulsanti nativi: ora riappaiono le frecce standard
            controls: () => {
              if (!currentSlide) return null;
              return (
                <>
                  {/* Div di chiusura esterno (solo desktop per non rompere le gesture mobile) */}
                  {!isMobile && (
                    <div 
                      onClick={handleClose}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: -1,
                        cursor: "pointer"
                      }}
                    />
                  )}
                  
                  {/* Elemento Counter Personalizzato nativo (es. "1 / 4") */}
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    fontFamily: "sans-serif",
                    zIndex: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "4px 10px",
                    borderRadius: "20px"
                  }}>
                    {slideIndex + 1} / {slides.length}
                  </div>
                  
                  {/* Pallini (Dots) di navigazione (solo desktop) */}
                  {!isMobile && slides.length > 1 && (
                    <div style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "calc(50% - 160px)",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: "6px",
                      zIndex: 15,
                      pointerEvents: "none"
                    }}>
                      {slides.map((_, idx) => (
                        <div 
                          key={idx}
                          style={{
                            width: idx === slideIndex ? "7px" : "5px",
                            height: idx === slideIndex ? "7px" : "5px",
                            borderRadius: "50%",
                            backgroundColor: idx === slideIndex ? "#3a86ff" : "rgba(255, 255, 255, 0.4)",
                            transition: "all 0.2s ease"
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Barra Laterale / Inferiore dei dettagli */}
                  <div style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    top: isMobile ? "auto" : 0,
                    left: isMobile ? 0 : "auto",
                    width: isMobile ? "100%" : "320px",
                    height: isMobile ? "auto" : "100%",
                    maxHeight: isMobile ? "30vh" : "100%",
                    backgroundColor: "rgba(20, 20, 20, 0.95)",
                    padding: "20px",
                    boxSizing: "border-box",
                    color: "#fff",
                    overflowY: "auto",
                    zIndex: 10,
                    borderTop: isMobile ? "1px solid #333" : "none"
                  }}>
                    <h2 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>
                      {currentSlide.projectTitle}
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "#aaa", margin: "0 0 15px 0" }}>
                      {currentSlide.stepCaption}
                    </p>
                    <p style={{ fontSize: "0.9rem", lineHeight: "1.4", margin: 0 }}>
                      {currentSlide.projectDescription}
                    </p>
                  </div>
                </>
              );
            }
          }}
        />
      )}
    </div>
  );
}
