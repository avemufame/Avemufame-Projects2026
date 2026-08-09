import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 👇 IL PARAMETRO DA TOCCARE PER IL RITARDO (TOLLERANZA) 👇
      // Cambia 20 con un numero più alto (es. 30 o 40) per ritardare ANCORA di più la scomparsa.
      const tolerance = 25; 

      // Calcola di quanti pixel si è mosso il mouse rispetto a prima
      const diff = currentScrollY - lastScrollY.current;

      // 1. Se l'utente va giù oltre i 100px totali E ha superato la soglia di tolleranza -> Nascondi
      if (diff > tolerance && currentScrollY > 125) {
        setIsVisible(false);
      } 
      // 2. Se l'utente va su oltre la soglia di tolleranza -> Mostra
      else if (diff < -tolerance) {
        setIsVisible(true);
      }

      // Aggiorna la posizione dell'ultimo scroll solo se il movimento è significativo
      if (Math.abs(diff) > tolerance) {
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navfixed ${!isVisible ? "hide" : "show"}`}>
        <section>
           {/* <img src="/picture/background.png" alt="Header Image" className="centerHeader" />*/}
            {/*<img src="/picture/Logo.png" alt="Header Image" className="centerHeaderleft" />*/}
           
          
        </section>
        
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/Portfolio">Portfolio</NavLink></li>
          <li><NavLink to="/Contact">Contact</NavLink></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
