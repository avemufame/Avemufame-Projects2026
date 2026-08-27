import { useState } from 'react';
import "../styles/Languagepicker.css";

function Langbutton({language, setLanguage}) {
  


    

    return (
    <>


      <div className="language-selector">
        
        {/* UK/English Button */}
        <button 
          className={`flag-btn ${language === 'eng' ? 'active' : ''}`}
          onClick={() => setLanguage('eng')}
          aria-label="Switch to English"
        >
          <svg viewBox="0 0 100 100" className="flag-svg">
            <clipPath id="circleView"><circle cx="50" cy="50" r="50"/></clipPath>
            <g clipPath="url(#circleView)">
              <path d="M0,0 H100 V100 H0 Z" fill="#012169"/>
              <path d="M0,0 L100,100 M0,100 L100,0" stroke="#fff" strokeWidth="12"/>
              <path d="M0,0 L100,100 M0,100 L100,0" stroke="#C8102E" strokeWidth="8"/>
              <path d="M50,0 V100 M0,50 H100" stroke="#fff" strokeWidth="20"/>
              <path d="M50,0 V100 M0,50 H100" stroke="#C8102E" strokeWidth="12"/>
            </g>
          </svg>
          <span className="flag-label">Eng</span>
        </button>

        {/* Italy/Italian Button */}
        <button 
          className={`flag-btn ${language === 'ita' ? 'active' : ''}`}
          onClick={() => setLanguage('ita')}
          aria-label="Passa all'Italiano"
        >
          <svg viewBox="0 0 100 100" className="flag-svg">
            <clipPath id="circleViewIta"><circle cx="50" cy="50" r="50"/></clipPath>
            <g clipPath="url(#circleViewIta)">
              <path d="M0,0 H33.3 V100 H0 Z" fill="#009246"/>
              <path d="M33.3,0 H66.6 V100 H33.3 Z" fill="#fff"/>
              <path d="M66.6,0 H100 V100 H66.6 Z" fill="#ce2b37"/>
            </g>
          </svg>
          <span className="flag-label">Ita</span>
        </button>

      </div>
  
    </>

      )
      }




export default Langbutton;