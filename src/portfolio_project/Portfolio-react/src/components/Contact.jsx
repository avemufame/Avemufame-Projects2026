import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser"; // Native frontend email driver
import "../styles/Contact.css"; // Imports your layout stylesheet

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const [nickname, setNickname] = useState(""); // Honeypot variable

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // 1. HONEYPOT ANTI-SPAM CHECK
    if (nickname !== "") {
      setStatus("Success! Thanks for reaching out."); // Quietly trick bots
      return;
    }

    // 2. TRIGGER EMAILJS DELIVERY USING YOUR REF
    emailjs
      .sendForm(
        "service_g46h8iq",  // Replace with your EmailJS Service ID
        "template_0tbqa7i", // Replace with your EmailJS Template ID
        formRef.current,
        "HDFTCsvL9egvlSUM7"   // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setStatus("Success! Thanks for reaching out.");
          formRef.current.reset(); // Clears all inputs on success
        },
        (error) => {
          setStatus("Failed to send message, please try again.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <div className="contact-layout">
      {/* Left Column: Direct Info Details */}
      <div className="contact-details">
        <div className="text-group">
        <h2>Get In Touch</h2>
        <p>Let's collaborate on projects or custom artwork drawings.</p>
        <a href="mailto:avemdesign@gmail.com">avemdesign@gmail.com</a>
      
        <p className="hours">⏱ Mon - Fri, 9am - 5pm GMT</p>
        <p className="location">📍 Brighton, United Kingdom</p>


        </div>
        <img src="/picture/AristoPeanut.png"   alt="art email message" className="immagine-mail" />
        
      </div>
    

      {/* Right Column: The Single Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="custom-form">
        
        {/* Invisible Honeypot Trap (Hidden from human eyes) */}
        <div className="hidden-honeypot" aria-hidden="true" style={{ display: "none" }}>
          <input 
            type="text" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            autoComplete="off" 
          />
        </div>

        {/* 
          ⚠️ VITAL: Make sure these 'name' attributes match the exact 
          {{variable_names}} inside your EmailJS dashboard template!
        */}
        <input type="text" name="user_name" placeholder="Full Name" required />
        <input type="email" name="user_email" placeholder="Email Address" required />
        
        <select name="user_subject">
          <option value="Project Inquiry">Project Inquiry</option>
          <option value="Saying Hello">Saying Hello</option>
          <option value="Art Commission">Art Commission</option>
        </select>

        <textarea name="user_message" placeholder="Your Message" required />
        
        <button type="submit" disabled={status === "Sending..."}>
          {status === "Sending..." ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p className={`status-log ${status.startsWith("Success") ? "success" : "error"}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
