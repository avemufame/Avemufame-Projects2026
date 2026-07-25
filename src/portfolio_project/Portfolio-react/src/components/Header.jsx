
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css"; // Ensure this matches your header's CSS path

function Header() {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle shrunk state if scrolled down more than 50 pixels
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* The class changes dynamically to "navfixed shrunk" when scrolling down */}
      <nav className={`navfixed ${isShrunk ? "shrunk" : ""}`}>
        
        <section className="headerimg">
          <div className="bio">
            <img src="/picture/Header.png" alt="Header Image" className="centerHeader" />
          </div>
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

