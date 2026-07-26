import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Footer.css'; // Make sure to create this style file

export default function Footer() {
  const formRef = useRef();
  const [subStatus, setSubStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubStatus('Subscribing...');

    emailjs.sendForm(
      'YOUR_SERVICE_ID',       // Use the same Service ID as your contact form
      'YOUR_NEWSLETTER_TEMP_ID', // Replace with your new Newsletter Template ID
      formRef.current,
      'YOUR_PUBLIC_KEY'        // Use the same Public Key as your contact form
    )
    .then(() => {
        setSubStatus('Thanks for subscribing! ✨');
        formRef.current.reset();
    }, (error) => {
        console.error('Newsletter Error:', error);
        setSubStatus('Failed. Please try again.');
    });
  };

  return (
    <footer className="portfolio-footer">
        
      <div className="footer-content">
        <div className="footer-left">
      <img src="picture/afoot.png" alt="logo" className='footer-logo'/>
        <p className="copyright">© 2026 Avem Design. All rights reserved.</p>
        </div>
        {/* Newsletter Form */}
        <form ref={formRef} onSubmit={handleSubscribe} className="footer-subscribe">
          <input 
            type="email" 
            name="subscriber_email" // VITAL: Must match {{subscriber_email}} in EmailJS
            placeholder="Subscribe for artwork updates" 
            required 
          />
          <button type="submit" disabled={subStatus === 'Subscribing...'}>
            {subStatus === 'Subscribing...' ? '...' : 'Subscribe'}
          </button>
        </form>
      </div>
      
      {subStatus && <p className="footer-status">{subStatus}</p>}
    </footer>
  );
}
