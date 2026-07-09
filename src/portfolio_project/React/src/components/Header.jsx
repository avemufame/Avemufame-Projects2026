function Header() {
    return (
    <>
<nav className="navfixed">
      
      <section className="headerimg">
        <div className="bio">
          <img src="public/picture/Header.png" alt="Header Image" className="centerHeader" />
        </div>
      </section>
      
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="shop.html">Shop</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a className="current">About Me</a></li>
      </ul>
    </nav>
    </>

      )
      }




export default Header