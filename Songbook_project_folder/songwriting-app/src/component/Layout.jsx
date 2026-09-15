import { AppShell, Tabs, Burger, Group, NavLink, Text, SimpleGrid, Card, Textarea, Badge, Code, Button, Stack } from '@mantine/core';
import { useDisclosure, useLocalStorage, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { Header } from './Header';

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Array state managing which frames are currently visible
  const [activePanels, setActivePanels] = useState(['lyrics']); 
  
  // Simple state to hold your lyrics as you type them
  const [lyricsText, setLyricsText] = useLocalStorage({
    key: 'songbook-lyrics',
    defaultValue: '',
  });

  // Chords variable 
  const [chords, setChords] = useState('');

  // Toggle state for the right songwriter tool drawer
  const [rightOpened, { toggle: toggleRight }] = useDisclosure();

  // Universal toggle function for our side menu links
  const togglePanel = (panelName) => {
    if (activePanels.includes(panelName)) {
      setActivePanels(activePanels.filter(id => id !== panelName));
    } else {
      setActivePanels([...activePanels, panelName]);
    }
  };

  const openSongFromJson = () => {
    // 1. Create a hidden file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
  
    // 2. Listen for when you select a file
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          // 3. Parse the file contents back into a JavaScript object
          const parsedData = JSON.parse(event.target.result);
          
          // 4. Update your application states safely
          if (parsedData.lyrics !== undefined) setLyricsText(parsedData.lyrics);
          if (parsedData.chords !== undefined) setChords(parsedData.chords);
          
          alert(`Successfully loaded: ${file.name}`);
        } catch (error) {
          alert('Error parsing the file. Please make sure it is a valid song JSON.');
        }
      };
      reader.readAsText(file);
    };
  
    // 3. Open the browser file selection window
    fileInput.click();
  };



  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{ width: 150, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{
        width: 200,
        breakpoint: 'md',
        collapsed: { desktop: !rightOpened, mobile: true },
      }}
      padding="md"
    >
      {/* 1. TOP HEADER BAR */}
      <Header opened={opened} toggle={toggle}/>
     
      {/* 2. SIDE MENU BAR BAR */}
      <AppShell.Navbar p="md">
        {isMobile ? (
         <Stack gap="xs">
         <Group justify="space-between" align="center">
           
           <Badge size="xs" color="orange" variant="light">WIP</Badge>
         </Group>

         <Text fw={800} size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} style={{ whiteSpace: 'nowrap' }}>
                  🎵 SONGBOOK Studio
                </Text>
         <Button size="xs" color="blue" onClick={() => alert('Save File functionality coming soon!')}>
           💾 Save Song
         </Button>
         <Button size="xs" color="teal" onClick={openSongFromJson}>
           📂 Open Song
         </Button>
       </Stack>
        ) : (
          <>
            <Text size="l" fw={700} c="dimmed" mb="sm" lts="1px">Workspace</Text>
            <NavLink 
              label="📝 Lyrics Pad" 
              description="Your main writing canvas"
              active={activePanels.includes('lyrics')} 
              onClick={() => togglePanel('lyrics')} 
            />
            <NavLink 
              label="🎸 Guitar Chords & Tabs" 
              description="Quick chord chart reference"
              active={activePanels.includes('tabs')} 
              onClick={() => togglePanel('tabs')} 
            />
            <NavLink 
              label="📚 Rhyming Dictionary" 
              description="Find matching line endings"
              active={activePanels.includes('rhymes')} 
              onClick={() => togglePanel('rhymes')} 
            />
            <NavLink 
              label="📚 Video" 
              description="Find mags"
              active={activePanels.includes('atomic')} 
              onClick={() => togglePanel('atomic')} 
            />
            <NavLink 
              label="Playlist/save" 
              description="Playlist"
              onClick={toggleRight}
            />
          </>
        )}
      </AppShell.Navbar>

      {/* 3. RIGHT SIDEBAR (The Aside Drawer) */}
      <AppShell.Aside p="md">
        
        <Text fw={700} size="sm" mb="md" c="violet">Save Open new Song panel </Text>
        <Badge size="xs" color="orange" variant="light">WIP</Badge>
        <Button size="xs" color="blue" fullWidth mb="xs" onClick={() => alert('Save File functionality coming soon!')}>💾 Save Current Song</Button>
        <Button size="xs" color="teal" fullWidth onClick={openSongFromJson}>📂 Open Existing Song</Button>
      </AppShell.Aside>

      {/* 4. DYNAMIC MAIN WINDOW FRAME */}
      <AppShell.Main>
        {isMobile ? (
          <Tabs defaultValue="lyrics">
            <Tabs.List grow mb="md">
              <Tabs.Tab value="lyrics">📝 Lyrics</Tabs.Tab>
              <Tabs.Tab value="tabs">🎸 Chords</Tabs.Tab>
              <Tabs.Tab value="rhymes">📚 Rhyme</Tabs.Tab>
              <Tabs.Tab value="atomic">📚 Video</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="lyrics" pt="xs">
              <Card withBorder shadow="sm" radius="md" p="md">
                <Group justify="space-between" mb="xs">
                  <Text fw={700} size="lg">Lyrics Workspace</Text>
                  <Badge color="gray" variant="outline">{lyricsText.split(/\s+/).filter(Boolean).length} words</Badge>
                </Group>
                <Textarea
                  placeholder="Start writing your masterpiece lyrics here..."
                  minRows={12}
                  autosize
                  value={lyricsText}
                  onChange={(event) => setLyricsText(event.currentTarget.value)}
                  styles={{ input: { fontFamily: 'inherit', fontSize: '16px', lineHeight: '1.6' } }}
                />
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="tabs" pt="xs">
              <Card withBorder shadow="sm" radius="md" p="md">
                <Text fw={700} size="lg" mb="sm">🎸 Basic Song Progressions</Text>
                <Text size="sm" c="dimmed" mb="md">Common songwriter structural shapes:</Text>
                <Group mb="xs">
                  <Badge color="teal">Verse</Badge>
                  <Text size="sm" fw={500} style={{ flex: 1 }}>
                    <Textarea
                      placeholder="G - C - Em - D"
                      minRows={1}
                      autosize
                      value={chords}
                      onChange={(event) => setChords(event.currentTarget.value)}
                      styles={{ input: { fontFamily: 'inherit', fontSize: '16px', lineHeight: '1.6' } }}
                    />
                  </Text>
                </Group>
                <Group mb="lg"><Badge color="indigo">Chorus</Badge> <Text size="sm" fw={500}>C - D - G - Em</Text></Group>
                <Code block ff="monospace" style={{ fontSize: '13px' }}>
                  E|---3---0---0---2---|{'\n'}
                  B|---3---1---0---3---|{'\n'}
                  G|---0---0---0---2---|{'\n'}
                  D|---0---2---2---0---|
                </Code>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="rhymes" pt="xs">
              <Card withBorder shadow="sm" radius="md" p="md">
                <Text fw={700} size="lg" mb="xs">📚 Quick Rhyme Kit</Text>
                <Text size="sm" c="dimmed" mb="md">Keep these matching sounds handy for inspiration:</Text>
                <Text size="sm" fw={600} c="blue" mb="3px">Ending in "-ight" (Light, Night, Flight)</Text>
                <Text size="xs" c="dimmed" mb="sm">"We walked into the neon light / chasing shadows through the night..."</Text>
                <Text size="sm" fw={600} c="purple" mb="3px">Ending in "-ear" (Fear, Clear, Near)</Text>
                <Text size="xs" c="dimmed">"Suddenly the path was clear / casting out our deepest fear..."</Text>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="atomic" pt="xs">
              <Card withBorder shadow="sm" radius="md" p="md">
                <Text fw={700} size="lg" mb="xs">📚 atomicamente </Text>
                <Text size="sm" c="dimmed" mb="md">Keep these .......:</Text>
              </Card>
            </Tabs.Panel>
          </Tabs>
        ) : (
          <SimpleGrid cols={{ base: 1, md: activePanels.length > 1 ? 2 : 1 }} spacing="lg">
            {activePanels.includes('lyrics') && (
              <Card withBorder shadow="sm" radius="md" p="md">
                <Group justify="space-between" mb="xs">
                  <Text fw={700} size="lg">Lyrics Workspace</Text>
                  <Badge color="gray" variant="outline">{lyricsText.split(/\s+/).filter(Boolean).length} words</Badge>
                </Group>
                <Textarea
                  placeholder="Start writing your masterpiece lyrics here..."
                  minRows={12}
                  autosize
                  value={lyricsText}
                  onChange={(event) => setLyricsText(event.currentTarget.value)}
                  styles={{ input: { fontFamily: 'inherit', fontSize: '16px', lineHeight: '1.6' } }}
                />
              </Card>
            )}

            {activePanels.includes('tabs') && (
              <Card withBorder shadow="sm" radius="md" p="md">
                <Text fw={700} size="lg" mb="sm">🎸 Basic Song Progressions</Text>
                <Text size="sm" c="dimmed" mb="md">Common songwriter structural shapes:</Text>
                <Group mb="xs">
                  <Badge color="teal">Verse</Badge>
                  <Text size="sm" fw={500} style={{ flex: 1 }}>
                    <Textarea
                      placeholder="G - C - Em - D"
                      minRows={1}
                      autosize
                      value={chords}
                      onChange={(event) => setChords(event.currentTarget.value)}
                      styles={{ input: { fontFamily: 'inherit', fontSize: '16px', lineHeight: '1.6' } }}
                    />
                  </Text>
                </Group>
                <Group mb="lg"><Badge color="indigo">Chorus</Badge> <Text size="sm" fw={500}>C - D - G - Em</Text></Group>
                <Code block ff="monospace" style={{ fontSize: '13px' }}>
                  E|---3---0---0---2---|{'\n'}
                  B|---3---1---0---3---|{'\n'}
                  G|---0---0---0---2---|{'\n'}
                  D|---0---2---2---0---|
                </Code>
              </Card>
            )}

            {activePanels.includes('rhymes') && (
              <Card withBorder shadow="sm" radius="md" p="md">
                <Text fw={700} size="lg" mb="xs">📚 Quick Rhyme Kit</Text>
                <Text size="sm" c="dimmed" mb="md">Keep these matching sounds handy for inspiration:</Text>
                <Text size="sm" fw={600} c="blue" mb="3px">Ending in "-ight" (Light, Night, Flight)</Text>
                <Text size="xs" c="dimmed" mb="sm">"We walked into the neon light / chasing shadows through the night..."</Text>
                <Text size="sm" fw={600} c="purple" mb="3px">Ending in "-ear" (Fear, Clear, Near)</Text>
                <Text size="xs" c="dimmed">"Suddenly the path was clear / casting out our deepest fear..."</Text>
              </Card>
            )}

            {activePanels.includes('atomic') && (
              <Card withBorder shadow="sm" radius="md" p="md">
                <Text fw={700} size="lg" mb="xs">📚 atomicamente </Text>
                <Text size="sm" c="dimmed" mb="md">Keep these .......:</Text>
              </Card>
            )}
          </SimpleGrid>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
