import { NavLink } from 'react-router-dom'

function Header() {
    return (
    <>
<nav className="navfixed">
      
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

      )
      }




export default Header;