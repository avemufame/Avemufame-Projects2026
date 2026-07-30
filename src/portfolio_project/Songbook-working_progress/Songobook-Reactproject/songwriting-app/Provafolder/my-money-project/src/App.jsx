import { useState, useRef } from 'react';
import { Container, Grid, Card, Title, Text, Textarea, ScrollArea, Group, Button, Tabs, Badge, Stack, useMantineColorScheme, TextInput, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [showRecorder, setShowRecorder] = useState(true);

  // --- MODAL DISCLOSURE MECHANICS ---
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [newSongTitle, setNewSongTitle] = useState('');

  // --- REALS SONGS STORAGE ARRAY STATE ---
  const [songs, setSongs] = useState([
    { id: '1', title: '✨ Midnight Blues', key: 'Am', tempo: '110', lyrics: '[Am] In the middle of the night... \n[F] under neon lights...', notes: 'Try using a slower guitar picking style.' },
    { id: '2', title: '🎸 Summer Rock', key: 'G', tempo: '128', lyrics: '[G] Sun is going down... \n[C] Driving out of town...', notes: 'Needs a high energy chorus transition.' },
    { id: '3', title: '🎹 Acoustic Track', key: 'C', tempo: '95', lyrics: '[C] Sitting by the window pane... \n[F] Listening to the morning rain...', notes: 'Piano baseline focus.' },
  ]);

  // Track which song is currently active on screen
  const [activeSongId, setActiveSongId] = useState('1');
  const activeSong = songs.find(s => s.id === activeSongId) || songs[0];

  // --- UPDATE CONTENT LOGIC ---
  const updateActiveSongField = (field, value) => {
    setSongs(prevSongs => prevSongs.map(song => 
      song.id === activeSongId ? { ...song, [field]: value } : song
    ));
  };

  // --- CREATE NEW SONG METHOD ---
  const handleCreateSong = (e) => {
    e.preventDefault();
    if (!newSongTitle.trim()) return;

    const newSongObj = {
      id: Date.now().toString(), // unique timestamp id
      title: newSongTitle,
      key: 'C',
      tempo: '120',
      lyrics: '',
      notes: ''
    };

    setSongs([...songs, newSongObj]);
    setActiveSongId(newSongObj.id); // instantly open the brand new song
    setNewSongTitle('');
    closeModal();
  };

  // --- AUDIO RECORDER LOGIC STATE ---
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioUrl(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecordingStatus('recording');
    } catch (err) {
      alert('Microphone error: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingStatus === 'recording') {
      mediaRecorderRef.current.stop();
      setRecordingStatus('stopped');
    }
  };

  return (
    <Container size="fluid" style={{ padding: '20px', height: '100vh', backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#f8f9fa' }}>
      <Stack gap="md" style={{ height: '100%' }}>
        
        {/* TOP PANEL */}
        <Group justify="space-between" align="center">
          <Group>
            <Title order={1} c="blue">📝 Songwriter Studio</Title>
            <Button variant="light" color="gray" size="xs" onClick={() => setShowRecorder(!showRecorder)}>
              {showRecorder ? 'Hide Recorder 🎙️' : 'Show Recorder 🎙️'}
            </Button>
          </Group>
          <Button variant="outline" color={colorScheme === 'dark' ? 'yellow' : 'blue'} onClick={toggleColorScheme} size="sm">
            {colorScheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </Group>

        {/* THE MAIN SPLIT LAYOUT */}
        <Grid gutter="md" style={{ flex: 1 }}>
          
          {/* LEFT PANEL */}
          {showRecorder && (
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="md" style={{ height: '100%' }}>
                
                {/* RECORDER */}
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Title order={4} c="red">🎙️ Voice Recorder</Title>
                    {recordingStatus === 'idle' && <Badge color="gray">Idle</Badge>}
                    {recordingStatus === 'recording' && <Badge color="red">🔴 Rec</Badge>}
                    {recordingStatus === 'stopped' && <Badge color="green">Saved Take</Badge>}
                  </Group>

                  <Stack gap="sm">
                    {recordingStatus !== 'recording' && !audioUrl && (
                      <Button color="red" fullWidth onClick={startRecording}>Start Recording</Button>
                    )}
                    {recordingStatus === 'recording' && (
                      <Button color="dark" fullWidth onClick={stopRecording} style={{ border: '1px solid red' }}>Stop</Button>
                    )}
                    {audioUrl && (
                      <Stack gap="xs">
                        <audio src={audioUrl} controls style={{ width: '100%' }} />
                        <Button variant="outline" color="gray" size="xs" onClick={() => setAudioUrl(null)}>Delete Take</Button>
                      </Stack>
                    )}
                  </Stack>
                </Card>


                {/* RECORDER */}
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Title order={4} c="red">🎙️ Voice Recorder</Title>
                    {recordingStatus === 'idle' && <Badge color="gray">Idle</Badge>}
                    {recordingStatus === 'recording' && <Badge color="red">🔴 Rec</Badge>}
                    {recordingStatus === 'stopped' && <Badge color="green">Saved Take</Badge>}
                  </Group>

                  <Stack gap="sm">
                    {recordingStatus !== 'recording' && !audioUrl && (
                      <Button color="red" fullWidth onClick={startRecording}>Start Recording</Button>
                    )}
                    {recordingStatus === 'recording' && (
                      <Button color="dark" fullWidth onClick={stopRecording} style={{ border: '1px solid red' }}>Stop</Button>
                    )}
                    {audioUrl && (
                      <Stack gap="xs">
                        <audio src={audioUrl} controls style={{ width: '100%' }} />
                        <Button variant="outline" color="gray" size="xs" onClick={() => setAudioUrl(null)}>Delete Take</Button>
                      </Stack>
                    )}
                  </Stack>
                </Card>

                {/* PLAYLIST INDEX */}
                <Card shadow="sm" padding="md" radius="md" withBorder style={{ flex: 1 }}>
                  <Group justify="space-between" mb="md">
                    <Title order={4} c="blue">🎵 Songbook Index</Title>
                    <Button size="xs" color="blue" onClick={openModal}>+ New Song</Button>
                  </Group>
                  
                  <ScrollArea h="38vh">
                    <Stack gap="xs">
                      {songs.map((song) => (
                        <Button 
                          key={song.id}
                          variant={song.id === activeSongId ? 'light' : 'subtle'} 
                          color={song.id === activeSongId ? 'blue' : 'gray'}
                          fullWidth 
                          justify="flex-start"
                          onClick={() => setActiveSongId(song.id)}
                        >
                          {song.title}
                        </Button>
                      ))}
                    </Stack>
                  </ScrollArea>
                </Card>
              </Stack>
            </Grid.Col>
          )}

          {/* RIGHT PANEL: Songwriting Editor Canvas */}
          <Grid.Col span={showRecorder ? { base: 12, md: 8 } : 12}>
            <Card shadow="sm" padding="md" radius="md" withBorder style={{ height: '100%' }}>
              <Title order={2}>{activeSong.title}</Title>
              
              <Group gap="lg" mb="md" mt="xs">
                <TextInput 
                  label="Key" 
                  size="xs" 
                  style={{ width: '70px' }} 
                  value={activeSong.key} 
                  onChange={(e) => updateActiveSongField('key', e.target.value)} 
                />
                <TextInput 
                  label="BPM" 
                  size="xs" 
                  style={{ width: '70px' }} 
                  value={activeSong.tempo} 
                  onChange={(e) => updateActiveSongField('tempo', e.target.value)} 
                />
              </Group>

              <Tabs defaultValue="lyrics">
                <Tabs.List>
                  <Tabs.Tab value="lyrics">📝 Lyrics & Chords</Tabs.Tab>
                  <Tabs.Tab value="notes">💡 Creative Ideas</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="lyrics" pt="xs">
                  <Textarea 
                    placeholder="Start typing your chords and lyric combinations here..."
                    minRows={14}
                    autosize
                    value={activeSong.lyrics}
                    onChange={(e) => updateActiveSongField('lyrics', e.target.value)}
                    styles={{ input: { fontFamily: 'monospace', fontSize: '16px', lineHeight: '1.6' } }}
                  />
                </Tabs.Panel>

                <Tabs.Panel value="notes" pt="xs">
                  <Textarea 
                    placeholder="Brainstorm ideas, alternative keys, or rhythmic meters here..." 
                    minRows={12} 
                    value={activeSong.notes}
                    onChange={(e) => updateActiveSongField('notes', e.target.value)}
                  />
                </Tabs.Panel>
              </Tabs>
            </Card>
          </Grid.Col>

        </Grid>
      </Stack>

      {/* POPUP POPPING INPUT WINDOW DIALOG */}
      <Modal opened={modalOpened} onClose={closeModal} title="Create New Track Structure" centered>
        <form onSubmit={handleCreateSong}>
          <Stack gap="md">
            <TextInput 
              label="Song Title" 
              placeholder="e.g., Neon Horizon" 
              required 
              value={newSongTitle}
              onChange={(e) => setNewSongTitle(e.target.value)}
              data-autofocus
            />
            <Group justify="end">
              <Button variant="outline" color="gray" onClick={closeModal}>Cancel</Button>
              <Button type="submit" color="blue">Initialize Track</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

    </Container>
  );
}

export default App;
