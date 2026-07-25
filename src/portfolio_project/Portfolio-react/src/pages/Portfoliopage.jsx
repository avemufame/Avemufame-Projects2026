import Portfolio from '../components/Portfolio';
import '../styles/altro.css'; //  stili CSS;


/*
const modules = import.meta.glob(
  '/src/assets/gallery/*.{jpg,jpeg,png,webp}',
  {eager: true
  
  }

);
/*
console.log("thisis the element", modules);
const firstKey = Object.keys(modules)[0];
const secondKey = Object.keys(modules)[1];

console.log("this is the first key element ", firstKey);
console.log("thisis the element in module", modules[firstKey]);
console.log("this is the second key element ", secondKey);
console.log("thisis the  second key element in modlue element", modules[secondKey]);


const imagesUrls = Object.values(modules).map((mod) => mod.default);

console.log("clean array of images urls", imagesUrls);    



  
const portfolioItems  = Object.entries(modules).map(([filePath, moduleValue], index) =>{

  const fileNameWithExt = filePath.split('/').pop();
  const cleanTitle = fileNameWithExt.split('.').shift().replace(/[_-]/g,'');


if(!moduleValue?.default) return null;

  return (
    {
    id: `auto-${index}`,
    src: moduleValue.default,
    title: cleanTitle
    
  }
  
  );
  }
  
  ).filter(Boolean); */
  


function PortfolioPage({ items }) {

  const portfolioItems = items || [];

  return (


      <section className="main">
      <div className="board"> 
      <h2>My Portfolio</h2>
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



