import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SketchGallery() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchContent() {
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
    <div className='gallery'>
      <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px' }}>
        <h1>Sketches Gallery</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {list.map((item, projectIdx) => (
            <div key={item.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                {item.project_steps?.map((step, stepIdx) => (
                  <img 
                    key={step.step_number}
                    src={step.image_url} 
                    alt={`Step ${step.step_number}`} 
                    onClick={() => {
                      setActiveProjectIndex(projectIdx);
                      setSlideIndex(stepIdx);
                    }}
                    style={{ 
                      maxHeight: '150px', 
                      borderRadius: '8px', 
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }} 
                  />
                ))}
              </div>
  
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{item.title}</h3>
              <p style={{ margin: '0 0 8px 0', color: '#555', fontSize: '14px' }}>{item.description}</p>
              <span style={{ fontSize: '11px', background: '#eee', padding: '3px 8px', borderRadius: '12px' }}>
                {item.project_steps?.length || 0} Steps
              </span>
              
            </div>
          ))}
        </div>
      </div>
      {/* 2. CONFIGURAZIONE DEL LIGHTBOX INSTAGRAM COMPATTO CON DOTS */}
      <Lightbox
        open={activeProjectIndex !== null}
        index={slideIndex}
        close={handleClose}
        on={{ 
          view: ({ index }) => setSlideIndex(index),
          click: () => handleClose() 
        }}
        slides={slides}
        plugins={[Zoom]}
        animation={{ zoom: 300 }}
        zoom={{ maxZoomPixelRatio: 3 }}
        
        styles={{
          container: { backgroundColor: "rgba(10, 10, 10, 0.9)" },
          root: {
            maxWidth: window.innerWidth > 768 ? "950px" : "100%",
            maxHeight: window.innerWidth > 768 ? "75vh" : "100%",
            margin: "auto",
            borderRadius: window.innerWidth > 768 ? "12px" : "0",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
          },
          slide: { 
            paddingRight: window.innerWidth > 768 ? "320px" : "0px",
            boxSizing: "border-box",
            cursor: "pointer"
          }
        }}

        render={{
          buttonPrev: () => null,
          buttonNext: () => null,

          controls: () => {
            if (!currentSlide) return null;
            return (
              <>
                {/* INDICATORE PALLINI (DOTS) SOTTO LA FOTO */}
                {window.innerWidth > 768 && slides.length > 1 && (
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

                {/* BARRA LATERALE INSTAGRAM STYLE */}
                <div className="instagram-sidebar" style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "320px",
                  backgroundColor: "#1c1c1e",
                  borderLeft: "1px solid #2c2c2e",
                  padding: "24px",
                  display: window.innerWidth > 768 ? "flex" : "none",
                  flexDirection: "column",
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                  zIndex: 20,
                  boxSizing: "border-box"
                }}>
                  
                  {/* Intestazione Titolo e X */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                    <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: "600", color: "#fff", paddingRight: "10px" }}>
                      {currentSlide.projectTitle}
                    </h4>
                    <button 
                      onClick={handleClose}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#aeaeb2",
                        fontSize: "20px",
                        cursor: "pointer",
                        padding: "0",
                        lineHeight: "1"
                      }}
                      title="Chiudi"
                    >
                      ✕
                    </button>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid #2c2c2e", margin: "0 0 15px 0" }} />

                  {/* Didascalia dello Step */}
                  <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#3a86ff", fontWeight: "700", marginBottom: "6px" }}>
                    Info Step Corrente
                  </span>
                  <p style={{ margin: "0 0 16px 0", color: "#fff", fontSize: "0.9rem", lineHeight: "1.5", backgroundColor: "#2c2c2e", padding: "10px", borderRadius: "6px" }}>
                    {currentSlide.stepCaption}
                  </p>
                  
                  {/* Descrizione del Progetto con Scroll */}
                  <div style={{ overflowY: "auto", flex: 1, paddingRight: "4px", marginBottom: "15px" }}>
                    <p style={{ margin: "0", color: "#aeaeb2", fontSize: "0.85rem", lineHeight: "1.4" }}>
                      {currentSlide.projectDescription}
                    </p>
                  </div>

                 {/* Pulsanti di Navigazione Minimali con Freccette */}
                 {slides.length > 1 && (
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      marginTop: "auto",
                      paddingTop: "15px",
                      borderTop: "1px solid #2c2c2e"
                    }}>
                      <span style={{ fontSize: "0.8rem", color: "#aeaeb2" }}>
                        {slideIndex + 1} / {slides.length}
                      </span>
                      
                      <div style={{ display: "flex", gap: "12px" }}>
                        {/* Freccia Sinistra (Precedente) */}
                        <button
                          disabled={slideIndex === 0}
                          onClick={() => setSlideIndex(prev => prev - 1)}
                          style={{
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: slideIndex === 0 ? "transparent" : "#2c2c2e",
                            color: slideIndex === 0 ? "#444" : "#fff",
                            border: "1px solid #2c2c2e",
                            borderRadius: "50%",
                            cursor: slideIndex === 0 ? "not-allowed" : "pointer",
                            fontSize: "18px",
                            transition: "all 0.2s",
                          }}
                          title="Precedente"
                        >
                          ‹
                        </button>
                        
                        {/* Freccia Destra (Successivo) */}
                        <button
                          disabled={slideIndex === slides.length - 1}
                          onClick={() => setSlideIndex(prev => prev + 1)}
                          style={{
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: slideIndex === slides.length - 1 ? "transparent" : "#3a86ff",
                            color: slideIndex === slides.length - 1 ? "#444" : "#fff",
                            border: slideIndex === slides.length - 1 ? "1px solid #2c2c2e" : "none",
                            borderRadius: "50%",
                            cursor: slideIndex === slides.length - 1 ? "not-allowed" : "pointer",
                            fontSize: "18px",
                            transition: "all 0.2s",
                          }}
                          title="Successivo"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </>
            );
          }
        }}
      />
    </div>
  );
}
