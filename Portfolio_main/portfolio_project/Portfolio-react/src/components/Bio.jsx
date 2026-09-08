
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import Langbutton from './LanguageButtons';

const bioContent = {

  eng: {
    title: 'aVeMuFaMe',
    text: `Hi! I’m aVeMuFaMe, an illustrator who loves mixing pixels and pigments, 
    constantly moving between digital and traditional mediums 
    in search of the perfect balance between spontaneity and precision.
    
    There was a time when I feared the worst: I was hearing voices. 
    Then I realized I wasn't going crazy—my head was just way too full of 
    characters screaming to come to life on paper. 
    The result? An absurd universe where people wear toilet seats as hats and 
    anthropomorphic peanuts roam around. 
    In my world, every sketch, color, and story seems to take on a life of its own.

    Is it "top" or "not top"?
    That's not for me to say. 
    One thing is for sure: the learning never stops, and every illustration is one step further 
    in giving a voice to this bizarre ecosystem growing inside of me.`,
  },

  ita: {
    title: 'aVeMuFaMe',
    text: `Ciao! sono Avemufame, un illustratore che ama mescolare pixel e pigmenti, 
    muovendosi costantemente tra il digitale e le tecniche tradizionali alla ricerca
    del perfetto equilibrio tra spontaneità e precisione.
    C'è stato un momento in cui ho temuto il peggio: sentivo delle voci. 
    Poi ho capito che non stavo impazzendo, avevo solo la testa troppo piena di personaggi 
    che gridavano per prendere vita sulla carta. 
    Il risultato? 
    Un universo assurdo dove la gente usa le tavolette del bagno come cappello e le arachidi antropomorfe vanno a spasso. 
    Nel mio mondo, ogni schizzo, colore e storia sembra voler prendere vita propria.
    Sarà "top" o "not top"? 
    Non sta a me dirlo. 
    Di sicuro non si smette mai di imparare e ogni illustrazione è un 
    passo in più per dare voce a questo strano ecosistema che cresce insieme a me.`,
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