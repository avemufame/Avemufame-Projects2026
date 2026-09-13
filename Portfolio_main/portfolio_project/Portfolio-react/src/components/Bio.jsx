
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Langbutton from './LanguageButtons';

const bioContent = {
  eng: {
    title: 'Bio',
    text: (
      <>
        I’m <strong>aVeMuFaMe</strong>, an illustrator who loves mixing <strong>pixels and pigments</strong>, 
        constantly moving between digital and traditional mediums 
        in search of the perfect balance between spontaneity and precision.
      
        There was a time when I feared the worst: <strong>I was hearing voices</strong>. 
        Then I realized I wasn't going crazy—my head was just way too full of 
        characters screaming to come to life on paper. 
        The result? An <strong>absurd universe</strong> where people wear toilet seats as hats and 
        anthropomorphic peanuts roam around. 
        In my world, every sketch, color, and story seems to take on a life of its own.
        <br /><br />
        Is it <strong>"top" or "not top"</strong>?<br />
        That's not for me to say. <br />
        One thing is for sure: the learning never stops, and every illustration is one step further 
        in giving a voice to this bizarre ecosystem growing inside of me.
      </>
    ),
  },
  ita: {
    title: 'Bio',
    text: (
      <>
        Sono <strong>aVeMuFaMe</strong>, un illustratore che ama mescolare <strong>pixel e pigmenti</strong>, 
        muovendosi costantemente tra digitale e tecniche tradizionali alla ricerca 
        del perfetto equilibrio tra spontaneità e precisione.
      
        C'è stato un momento in cui ho temuto il peggio: <strong>sentivo delle voci</strong>. 
        Poi ho capito che non stavo affatto impazzendo — avevo solo la testa troppo piena di personaggi 
        che urlavano per prendere vita sulla carta.
        <br /><br />
        Il risultato? Un <strong>universo assurdo</strong> dove le persone usano le tavolette del water come cappello 
        e le arachidi antropomorfe vanno a spasso. Nel mio mondo, ogni schizzo, colore e storia 
        sembra rivendicare una propria identità.
        <br /><br />
        Sarà <strong>"top" o "not top"</strong>? Non sta a me dirlo. 
        Di sicuro non si smette mai di imparare, e ogni illustrazione è un passo in più per dare voce 
        a questo strano ecosistema che cresce insieme a me.
      </>
    ),
  }
};




function Bio() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('userLanguage') || 'eng';
  });
   // 3. Salva la lingua nel browser ogni volta che l'utente clicca un pulsante e cambia lo stato
   useEffect(() => {
    localStorage.setItem('userLanguage', language);
  }, [language]);
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