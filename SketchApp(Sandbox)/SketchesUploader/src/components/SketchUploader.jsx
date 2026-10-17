import { useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  TextInput, 
  Select, 
  Textarea, 
  Button, 
  Text, 
  Stack, 
  Box, 
  Paper,
  List
} from '@mantine/core';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SketchUploader({ onUploadSuccess }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('commissions'); 
    const [files, setFiles] = useState([]); 
    const [isDragging, setIsDragging] = useState(false);

    // Riferimento per attivare l'input di tipo file nascosto
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
          file.type.startsWith('image/')
        );
        
        if (droppedFiles.length === 0) {
          alert("Per favore, rilascia solo file di tipo immagine!");
          return;
        }
        setFiles(droppedFiles);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const trimmedTitle = title.trim();
      const trimmedDescription = description.trim();

      if (!trimmedTitle) {
        alert("Please enter a title before saving!");
        return; 
      }
      if (!trimmedDescription) {
        alert("Please enter a description before saving!");
        return; 
      }
      if (files.length === 0) { 
        alert("Seleziona almeno un'immagine!");
        return;
      }

      const uploadedUrls = [];

      for (const currentFile of files) {
        const fileExt = currentFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('sketch-images') 
          .upload(filePath, currentFile);

        if (uploadError) {
          alert(`Errore caricamento immagine: ${uploadError.message}`);
          return; 
        }

        const { data: { publicUrl } } = supabase.storage
          .from('sketch-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert([{ 
          title: trimmedTitle, 
          description: trimmedDescription,
          category: category 
        }])
        .select()
        .single(); 
  
      if (projectError) {
        console.error("Errore durante l'inserimento del progetto:", projectError.message);
        alert(`Errore Progetto: ${projectError.message}`);
        return;
      }

      const projectId = newProject.id;

      const stepRecords = uploadedUrls.map((url, index) => {
        return {
          project_id: projectId,
          step_number: index + 1, 
          image_url: url,
          caption: `Process image ${index + 1}`
        };
      });

      const { error: stepsError } = await supabase
        .from('project_steps')
        .insert(stepRecords);

      if (stepsError) {
        console.error("Errore durante l'inserimento dei passaggi:", stepsError.message);
        alert(`Errore Step: ${stepsError.message}`);
      } else {
        alert("Progetto e tutti i relativi step salvati con successo!");
        
        setTitle('');
        setDescription('');
        setCategory('commissions');
        setFiles([]); 
        
        if (onUploadSuccess) onUploadSuccess();
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <Paper 
        p="xl" 
        radius={20} 
        
        shadow="md"
      >
        <Stack spacing="md">
          
          <TextInput 
            label="Title" 
            placeholder="Inserisci il titolo"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Select
            label="Category"
            value={category}
            onChange={setCategory}
            data={[
              { value: 'commissions', label: 'Commission' },
              { value: 'sketches', label: 'Sketch Process' },
              { value: 'projects', label: 'Projects' },
            ]}
          />

          <Textarea
            label="Description"
            placeholder="Write a longer description about your creative process here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={5}
            autosize
            required
          />

          <Box>
            <Text weight={500} size="sm" mb={4}>Images:</Text>
            
            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              sx={(theme) => ({
                border: isDragging ? `2px dashed ${theme.colors.blue[6]}` : `2px dashed ${theme.colors.gray[4]}`,
                backgroundColor: isDragging ? theme.colors.blue[0] : theme.colors.gray[0],
                borderRadius: theme.radius.md,
                padding: theme.spacing.xl,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s, border-color 0.2s',
                '&:hover': {
                  borderColor: theme.colors.blue[6],
                  backgroundColor: theme.colors.gray[1],
                }
              })}
            >
              <Text size="md" color="dimmed">
                Trascina le tue immagini qui o <Text as="span" color="blue" weight={700}>clicca per sfogliare</Text>
              </Text>
              <Text size="xs" color="dimmed" mt={4}>
                (Puoi selezionare o trascinare più file contemporaneamente)
              </Text>
              
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                multiple 
                onChange={(e) => setFiles(Array.from(e.target.files))}
                style={{ display: 'none' }}
              />
            </Box>

            {files.length > 0 && (
              <Paper withBorder p="xs" mt="sm" radius="sm" bg="gray.0">
                <Text size="sm" weight={600} mb={4}>File pronti ({files.length}):</Text>
                <List size="sm" color="dimmed">
                  {files.map((file, index) => (
                    <List.Item key={index}>
                      {file.name} - {(file.size / 1024).toFixed(1)} KB
                    </List.Item>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          <Button type="submit" size="md" color="blue" fullWidth mt="md">
            Save Project
          </Button>

        </Stack>
      </Paper> {/* Chiusura del tag Paper mancante aggiunta correttamente */}
    </form>
  );
}
