import Bio from '../components/Bio';
import Fportfolio from '../components/Fportfolio';
import Productboard from '../components/Product';

function Homepage({ carouselItems }) {
  return (
  
    <section className="main">
    <div className="board">  
  
    <Bio /> 
     
 
      <section className="img_bio"> 
        <img src="../public/picture/1.png" width="300" alt="bio presentation" className="center" />
      </section>
    </div>  

    <div id="boards2" className="board2">
    <Productboard />

    <Fportfolio 
    carouselItems={carouselItems}
    />
  
   
    
    </div>
    </section>    
          
        
  );
}

export default Homepage;