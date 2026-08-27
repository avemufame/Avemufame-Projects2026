import Portfolio from '../components/Portfolio';
import '../styles/altro.css'; //  stili CSS;



function PortfolioPage({ items }) {

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
    Main Portfolio
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
</div>



      <div id="gallery" class ="portfolio-grid">
      {portfolioItems.map(function (item, index) {
      return (

    <Portfolio
      key={item.id}
      src={item.src}
      title={item.title}
      currentIndex={index} //where to start the slides
      allImages={portfolioItems}
    /> 

  )})
  }

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



