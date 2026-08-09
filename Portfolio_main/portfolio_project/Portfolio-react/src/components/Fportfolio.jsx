import Carousel from '../components/Carousel'
import { NavLink } from 'react-router-dom'
function Fportfolio({ carouselItems }) {
    return (
    <>
    
            <section className="Fportfolio">
              <h2>Featured Portfolio</h2>
              <Carousel
              carouselItems={carouselItems}
              />
               <nav2 className="sub-nav">
                <ul>
                  <li><NavLink to="/Portfolio">VIEW FULL PORTFOLIO</NavLink></li>
                  
                </ul>
              </nav2>
              
            
            </section> 
    </>

      )
      }




export default Fportfolio