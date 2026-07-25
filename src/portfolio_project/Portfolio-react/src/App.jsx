import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/Portfoliopage';
import Contactpage from './pages/Contactpage';
import Homepage from './pages/Homepage'; 
import Header from './components/Header';

import './styles/styles2.css'; //  stili CSS;


const modules = import.meta.glob(
  './assets/gallery/*.{jpg,jpeg,png,webp}', {eager: true});
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


     <BrowserRouter>
      
      <Header />
      

        <main>

      
        
          <Routes>
          


          <Route path="/" element={<Homepage  carouselItems={globalPortfolioItems}  />} />
          <Route path="/Portfolio" element={<PortfolioPage  items={globalPortfolioItems} />} />
          <Route path="/Contact" element={<Contactpage />} />
          
         
          </Routes>
          
          
        
       
      </main>
      </BrowserRouter>

      <footer>
        <img src="/public/picture/afoot.png" width="80" height="80" alt="art footer icon" />
        <p>Artist &copy; Mr name</p>
      </footer>
    </>
  );
}

export default App;
