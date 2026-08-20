import { AppShell, Burger, Group, NavLink, Text, SimpleGrid, Card, Textarea, Badge, Code } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Header } from './Header';

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  
  // Array state managing which frames are currently visible
  const [activePanels, setActivePanels] = useState(['lyrics']); 
  
  // Simple state to hold your lyrics as you type them
  const [lyricsText, setLyricsText] = useState('');

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

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{ width: 150, breakpoint: 'sm', collapsed: { mobile: !opened } }}

      // Right Drawer Configuration
      aside={{
        width: 200,
        breakpoint: 'md', // Hides on tablets/phones to keep the screen clean
        collapsed: { desktop: !rightOpened, mobile: !rightOpened },
      }}


      padding="md"
    >
      {/* 1. TOP HEADER BAR */}
     <Header />
     

      {/* 2. SIDE MENU BAR BAR */}
      <AppShell.Navbar p="md">
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
          label="📚 atomic" 
          description="Find mags"
          active={activePanels.includes('atomic')} 
          onClick={() => togglePanel('atomic')} 
        />
         <NavLink 
          label="Right drawer" 
          description="Find mags"
          active={activePanels.includes('atomic')} 
          onClick={toggleRight}
          
        />
      </AppShell.Navbar>



          {/* 3. RIGHT SIDEBAR (The Aside Drawer) */}

          <AppShell.Aside p="md">
            
        <Text fw={700} size="sm" mb="md" c="violet">SAve Open new SOng pannel </Text>
        <Text size="xs" c="dimmed" mb="sm">Save song/open song :</Text>
        <Text size="sm" fw={500}>• Working in progress</Text>
        <Text size="sm" fw={500}>• add the Video and audio panel or add a button on the top header </Text>
      </AppShell.Aside>




      {/* 3. DYNAMIC MAIN WINDOW FRAME */}
      <AppShell.Main>
        
        {/* SimpleGrid adjusts dynamically based on how many panels are pulled up */}
        <SimpleGrid cols={{ base: 1, md: activePanels.length > 1 ? 2 : 1 }} spacing="lg">
          
          {/* PANEL A: THE LYRICS TEXT PAD */}
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

          {/* PANEL B: GUITAR TABS CHART */}
          {activePanels.includes('tabs') && (
            <Card withBorder shadow="sm" radius="md" p="md">
              <Text fw={700} size="lg" mb="sm">🎸 Basic Song Progressions</Text>
              <Text size="sm" c="dimmed" mb="md">Common songwriter structural shapes:</Text>
              
              <Group mb="xs"><Badge color="teal">Verse</Badge> <Text size="sm" fw={500}>
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
              
              <Text size="xs" fw={700} c="dimmed" mb="xs">TABLATURE CHEAT SHEET</Text>
              <Code block ff="monospace" style={{ fontSize: '13px' }}>
                E|---3---0---0---2---|{'\n'}
                B|---3---1---0---3---|{'\n'}
                G|---0---0---0---2---|{'\n'}
                D|---0---2---2---0---|
              </Code>
            </Card>
          )}

          {/* PANEL C: RHYMING REFERENCE BOX */}
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

             {/* PANEL D: new one to add a new feature  */}
             {activePanels.includes('atomic') && (
            <Card withBorder shadow="sm" radius="md" p="md">
              <Text fw={700} size="lg" mb="xs">📚 atomicamente </Text>
              <Text size="sm" c="dimmed" mb="md">Keep these .......:</Text>
              
              
            </Card>
          )}

        </SimpleGrid>
      </AppShell.Main>
    </AppShell>
  );
}

