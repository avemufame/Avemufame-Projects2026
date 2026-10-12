import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SketchUploader() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('commissions'); // 1. State for dividing project types
    const [files, setFiles] = useState([]); // 2. Changed from null to an empty array
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const trimmedTitle = title.trim();
      const trimmedDescription = description.trim();

      // Form validation updates
      if (!trimmedTitle) {
        alert("Please enter a title before saving!");
        return; 
      }
      if (!trimmedDescription) {
        alert("Please enter a description before saving!");
        return; 
      }
      if (files.length === 0) { // 3. Updated check for multiple files
        alert("Seleziona almeno un'immagine!");
        return;
      }

      // Temporary array to collect public URLs from storage
      const uploadedUrls = [];

      // 4. Standard loop allows 'await' to upload files in sequential order
      for (const currentFile of files) {
        const fileExt = currentFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('sketch-images') 
          .upload(filePath, currentFile);

        if (uploadError) {
          alert(`Errore caricamento immagine: ${uploadError.message}`);
          return; // Halts the upload sequence if one breaks
        }

        const { data: { publicUrl } } = supabase.storage
          .from('sketch-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      // 5. INSERT 1: Save the main parent record details first
      const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert([{ 
          title: trimmedTitle, 
          description: trimmedDescription,
          category: category // 'commissions' or 'sketches'
        }])
        .select()
        .single(); // Tells Supabase to return the newly generated object
  
      if (projectError) {
        console.error("Errore durante l'inserimento del progetto:", projectError.message);
        alert(`Errore Progetto: ${projectError.message}`);
        return;
      }

      // Grab the generated primary key ID
      const projectId = newProject.id;

      // 6. Format the gathered URLs into child rows linked by the foreign key
      const stepRecords = uploadedUrls.map((url, index) => {
        return {
          project_id: projectId,
          step_number: index + 1, // Step 1, Step 2, Step 3...
          image_url: url,
          caption: `Process image ${index + 1}`
        };
      });

      // 7. INSERT 2: Batch save all steps into the subfolder table at once
      const { error: stepsError } = await supabase
        .from('project_steps')
        .insert(stepRecords);

      if (stepsError) {
        console.error("Errore durante l'inserimento dei passaggi:", stepsError.message);
        alert(`Errore Step: ${stepsError.message}`);
      } else {
        alert("Progetto e tutti i relativi step salvati con successo!");
        
        // Reset full form state back to initial values
        setTitle('');
        setDescription('');
        setCategory('commissions');
        setFiles([]); 
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className='sketch'>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ width: '100%', padding: '8px', fontSize: '16px', boxSizing: 'border-box', marginBottom: '10px' }}
          />
        </div>

        {/* 8. NEW: Category dropdown input field */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Category:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px', boxSizing: 'border-box', marginBottom: '10px' }}
          >
            <option value="commissions">Commission</option>
            <option value="sketches">Sketch Process</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Write a longer description about your creative process here..." 
            rows={5} 
            style={{ width: '100%', padding: '8px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', marginBottom: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Images (Select multiple):</label>
          <input 
            type="file" 
            accept="image/*"
            multiple // 9. Enabled multi-selection capability
            onChange={(e) => setFiles(Array.from(e.target.files))} // 10. Converted standard file list to modern JS Array
          />
        </div>
      </div>

      <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Save Project</button>
    </form>
  );
}