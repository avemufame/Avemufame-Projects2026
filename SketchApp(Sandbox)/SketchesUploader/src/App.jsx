import "./app.css";
import { useState } from 'react';
import { Button, Group, Box, Stack } from '@mantine/core';

import SketchUploader from './components/SketchUploader';
import SketchGallery from './components/SketchGallery';
import SketchGallery2 from './components/SketchGallery2';

export default function App() {
  const [currentView, setCurrentView] = useState('upload'); 

  return (
    <Box
      sx={(theme) => ({
        // Usa il colore scuro di sfondo nativo di Mantine v6
        backgroundColor: theme.colors.dark[7],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: currentView === 'upload' ? 'center' : 'flex-start',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        padding: '2rem',
        boxSizing: 'border-box',
      })}
    >
      <Stack style={{ width: '100%', maxWidth: currentView === 'upload' ? 600 : 1200 }} spacing="md">
        
        {/* Pulsanti di Navigazione in stile Dark */}
        <Group position="center" spacing="xs">
          <Button 
            variant={currentView === 'upload' ? 'filled' : 'light'} 
            color="blue"
            onClick={() => setCurrentView('upload')}
          >
            Upload New
          </Button>
          
          <Button 
            variant={currentView === 'gallery' ? 'filled' : 'light'} 
            color="blue"
            onClick={() => setCurrentView('gallery')}
          >
            View Commissions
          </Button>
          
          <Button 
            variant={currentView === 'gallery2' ? 'filled' : 'light'} 
            color="blue"
            onClick={() => setCurrentView('gallery2')}
          >
            View Sketches
          </Button>
        </Group>

        {/* Contenuto dell'applicazione */}
        <Box style={{ width: '100%' }}>
          {currentView === 'upload' && (
            <SketchUploader onUploadSuccess={() => setCurrentView('gallery2')} />
          )}
          
          {currentView === 'gallery' && (
            <SketchGallery />
          )}

          {currentView === 'gallery2' && (
            <SketchGallery2 /> 
          )}
        </Box>

      </Stack>
    </Box>
  );
}
