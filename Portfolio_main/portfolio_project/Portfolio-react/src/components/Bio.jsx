
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import Langbutton from './LanguageButtons';

const bioContent = {

  eng: {
    title: 'Bio',
    text: 'This is my English biography content...',
  },
  ita: {
    title: 'Ciao! sono Avemufame',
    text: `Un illustratore che ama mescolare pixel e pigmenti.
    Lavoro tra il digitale e le tecniche tradizionali, 
    cercando sempre un equilibrio tra spontaneità e precisione. 
    Ero disperato sentivo le voci, ma poi ho capito che avevo solo 
    la testa piena di personaggi e volevano solo prendere vita su carta. 
    Un universo dove tizi usano tavolette del bagno come cappello  
    dove esistono arachidi antropomorfe tutto sembra voler prendere vita propria tra schizzi,
    colori e storie.  Top? oppure not top? non si sa. Di sicuro non si smette mai d’imparare ma ogni illustrazione
    è un passo in più per dare voce a questo mondo che cresce insieme a me. 
    Se sei curioso trova il QR code e visita il mio sito.`,
  }
};


function Bio() {
  const [language, setLanguage] = useState('eng');
    return (
    <>




    <section className="bio">
     <Langbutton 
     language={language}
     setLanguage={setLanguage}
     />
      
        {/* Access the text dynamically based on the state string ('eng' or 'ita') */}
    <h2>
        {bioContent[language].title}
      </h2>
      <p>
        {bioContent[language].text}
      </p>
            </section>
    </>

      )
      }




export default Bio;