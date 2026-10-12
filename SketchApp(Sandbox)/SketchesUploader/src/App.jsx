import './App.css';
import { useState } from 'react';
import SketchUploader from './components/SketchUploader';
import SketchGallery from './components/SketchGallery';


export default function App() {
  // 'upload' shows the form, 'gallery' shows the list
  const [currentView, setCurrentView] = useState('upload'); 

  return (
    <div className="main-container">
      {/* Navigation Buttons */}
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setCurrentView('upload')}>Upload New</button>
        <button onClick={() => setCurrentView('gallery')}>View Gallery</button>
      </nav>

      {/* Conditionally show the component */}
      {currentView === 'upload' ? (
        <SketchUploader onUploadSuccess={() => setCurrentView('gallery')} />
      ) : (
        <SketchGallery />
      )}
    </div>
  );
}