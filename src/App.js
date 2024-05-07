import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import TiledView from './components/TiledView';

function App() {
  const [image, setImage] = useState(null);
  const [view, setView] = useState('upload'); // 'upload' or 'tiled'

  const handleFileAccepted = file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setView('tiled');
    };
    reader.readAsDataURL(file);
  };

  const handleExit = () => {
    setView('upload');
    setImage(null);
  };

  return (
    <div>
      {view === 'upload' && <FileUpload onFileAccepted={handleFileAccepted} />}
      {view === 'tiled' && image && (
        <TiledView 
          image={image}
          onImageChange={(newImage) => setImage(newImage)} // New prop to handle image changes
        />
      )}
      {view === 'tiled' && (
        <button 
            onClick={handleExit} 
            className="fixed bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 font-medium text-sm rounded"
          >
            Exit
          </button>
      )}
    </div>
  );
}

export default App;
