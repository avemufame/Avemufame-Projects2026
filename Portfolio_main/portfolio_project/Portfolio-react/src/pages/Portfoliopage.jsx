
import React, { useState } from 'react'; 
import Portfolio from '../components/Portfolio';
import '../styles/portfolio.css'; //  stili CSS;



function PortfolioPage({ items }) {
  const [category, setCategory] = useState('main');

  const portfolioItems = items || [];

  return (


      <section className="main">


      <div className="board"> 
      
     
      <div style={{ 
          marginBottom: '30px', 
          display: 'flex', 
          justifyContent: 'flex-start', 
          width: '100%', 
          gap: '20px' // Più spazio tra le parole
        }}>
  <button 
    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }} 
    onClick={() => setCategory('main')}
  >
    Portfolio
  </button>
  <button 
    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }} 
    onClick={() => setCategory('commissions')}
  >
    Commissions
  </button>
  <button 
    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }} 
    onClick={() => setCategory('sketches')}
  >
    Sketches
  </button>

  {/*<button 
    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }} 
    onClick={() => setCategory('products')}
  >
    Products
  </button>*/}
</div>


      <div id="gallery" className="portfolio-grid">

      {category === 'main' && (
            <>
              <h3>Portfolio</h3>
              {portfolioItems.map((item, index) => (
                <Portfolio
                  key={item.id || index}
                  src={item.src}
                  title={item.title}
                  currentIndex={index} 
                  allImages={portfolioItems}
                />
              ))}
            </>
          )}
      
        {category === 'commissions' && (
          <>
        <h3>Commissions</h3>
 
        <img src="picture/bio.gif" width="300" alt="bio presentation" />
    
        
        </>

        )}
        
        {category === 'sketches' &&(
          <>
        <h3>Sketches</h3>
        <p>Working in Progres...</p>
        </>
        ) }
   


  

        </div>
        </div>
      </section>  
      
  
  );
}

export default PortfolioPage;





/*

  */

/*
const portfolioItems = [
  {id:1, src:"/src/assets/gallery/AristoPenuat.png", title:"Project one"},
  {id:2, src:"/src/assets/gallery/basketItemPreview.jpeg", title:"Project two"},
  {id:3, src:"/src/assets/gallery/Brighton_view.jpg", title:"Project 3"},
  
  ]; 
 */



