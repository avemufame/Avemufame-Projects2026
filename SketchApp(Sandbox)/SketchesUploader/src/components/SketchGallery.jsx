import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import '../styles/portfolio.css'; // Carica gli stili CSS per le colonne Masonry

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SketchGallery2() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [list, setList] = useState([]);
  
  // 1. STATO DI CARICAMENTO AGGIUNTO
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true); // Inizia il caricamento
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
        .eq('category', 'commissions');
      
      if (data) setList(data);
      setLoading(false); // Caricamento completato
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
      <h1>Commissions</h1>
      
      {/* ==========================================
          1. GRIGLIA PORTFOLIO MASONRY (STILE PINTEREST)
         ========================================== */}
      <div className="portfolio-grid">
        {loading ? (
          // SE STA CARICANDO: mostra 6 schede grigie animate
          [220, 160, 260, 180, 240, 200].map((height, index) => (
            <div 
              key={index} 
              className="skeleton-card skeleton-pulse" 
              style={{ height: `${height}px` }} 
            />
          ))
        ) : (
          // SE HA FINITO: mostra i tuoi sketch reali
          list.map((item, projectIdx) => {
            const sortedSteps = item.project_steps 
              ? [...item.project_steps].sort((a, b) => a.step_number - b.step_number)
              : [];

            return (
              <div key={item.id} className="grid-item">
                
                {/* Contenitore a scorrimento orizzontale interno */}
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
                        setSlideIndex(stepIdx); // Apre il lightbox sullo specifico step cliccato
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

           {/* ==========================================
          2. CONFIGURAZIONE DEL LIGHTBOX CUSTOM (PARTE A)
         ========================================== */}
      {activeProjectIndex !== null && (
        <Lightbox
          open={activeProjectIndex !== null}
          index={slideIndex}
          close={handleClose}
          
          controller={{ 
            closeOnBackdropClick: true // Configurazione nativa per chiudere sul backdrop
          }}
          
          on={{ 
            view: ({ index }) => setSlideIndex(index),
            // Rimosso il click generico per non far chiudere il lightbox cliccando sulla foto
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
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              pointerEvents: "auto" // Intercetta i click all'interno del box da 950px
            },
            slide: { 
              paddingRight: window.innerWidth > 768 ? "320px" : "0px",
              boxSizing: "border-box",
              cursor: "default"
            }
          }}

          render={{
            buttonPrev: () => null,
            buttonNext: () => null,

            controls: () => {
              if (!currentSlide) return null;
              return (
                <>
                  {/* LAYER INVISIBILE ESTERNO
                      Copre l'intero schermo dietro al box centrale di Instagram.
                      Cliccando qui, il lightbox si chiude immediatamente. */}
                  <div 
                    onClick={handleClose}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1,
                      cursor: "pointer"
                    }}
                  />
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
                  <div 
                    className="instagram-sidebar" 
                    // Impedisce al click dentro la sidebar di propagarsi al layer esterno di chiusura
                    onClick={(e) => e.stopPropagation()} 
                    style={{
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
                      boxSizing: "border-box",
                      cursor: "default"
                    }}
                  >
                    
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
                          {/* Freccia Sinistra */}
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
                          
                          {/* Freccia Destra */}
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
      )}
    </div>
  );
}
