import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/Portfoliopage';
import Contactpage from './pages/Contactpage';
import Homepage from './pages/Homepage'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Aboutpage from './pages/Aboutpage';

import './styles/styles2.css'; //  stili CSS;



const modules = import.meta.glob(
  '/public/gallery_port/*.{jpg,jpeg,png,webp,gif}', {eager: true});
const globalPortfolioItems  = Object.entries(modules).map(([filePath, moduleValue], index) =>{
  const fileNameWithExt = filePath.split('/').pop();
  const cleanTitle = fileNameWithExt.split('.').shift().replace(/[_-]/g,'');
  if(!moduleValue?.default) return null;

  return (
    {
    id: `auto-${index}`,
    src: moduleValue.default,
    title: cleanTitle
    
  }
  
  );
  }
  
  ).filter(Boolean);



function App() {
 
  return (
    <>


     <HashRouter>
      
      <Header />
      

        <main>

      
        
          <Routes>
          


          <Route path="/" element={<Homepage  carouselItems={globalPortfolioItems}  />} />
          <Route path="/Portfolio" element={<PortfolioPage  items={globalPortfolioItems} />} />
          <Route path="/Contact" element={<Contactpage />} />
          <Route path="/Aboutpage" element={<Aboutpage />} />
          
         
          </Routes>
          
          
        
       
      </main>
      </HashRouter>
      
      <Footer />

    
       
        
     
    </>
  );
}

export default App;
