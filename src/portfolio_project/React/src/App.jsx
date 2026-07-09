import React, { useState } from 'react';
import Header from './components/Header'
import Fportfolio from './components/Fportfolio'
import Header from './components/Product'
import Bio from './components/Bio'

import './styles/styles2.css'; //  stili CSS

function App() {
 
  return (
    <>
      
      <Header />
      

      <main>
        <section className="main">
          <div className="board">  

          <Bio /> 
           

            <section className="img_bio"> 
              <img src="/public/picture/1.png" width="300" alt="bio presentation" className="center" />
            </section>
          </div>  

          <div id="boards2" className="board2"> 

          <Fportfolio />
          <Productboard />

         
          </div>

          
        </section>
      </main>

      <footer>
        <img src="/public/picture/afoot.png" width="80" height="80" alt="art footer icon" />
        <p>Artist &copy; Mr name</p>
      </footer>
    </>
  );
}

export default App;
