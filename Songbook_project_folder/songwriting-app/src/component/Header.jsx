import { useState } from 'react';
import { AppShell, Group, Burger, Text, Badge, TextInput, NumberInput, Select, Button, UnstyledButton } from '@mantine/core';
import { useDisclosure,  useLocalStorage } from '@mantine/hooks';

export function Header({ opened, toggle }) {
  
  
  // State for your Phase 2 Data
  const [title, setTitle] = useLocalStorage({
    key: 'songbook-title',
    defaultValue: '',
  });
  const [bpm, setBpm] = useState(120);
  const [timeSig, setTimeSig] = useState('4/4');
  const [songKey, setSongKey] = useState('E Major');
  const [lastTap, setLastTap] = useState(0);

  // Tap Tempo Logic
  const handleTapTempo = () => {
    const now = Date.now();
    if (lastTap > 0) {
      const diff = now - lastTap;
      if (diff < 2000) { // Only calculate if taps are less than 2 seconds apart
        const calculatedBpm = Math.round(60000 / diff);
        setBpm(Math.min(Math.max(calculatedBpm, 40), 250)); // Clamp between 40 and 250 BPM
      }
    }
    setLastTap(now);
  };

  const LogClick = () => {
    console.log("Logo Clicked! open version pop up in future Version 1")
  };

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap" style={{ position: 'relative'}}>
        
        {/* Left Section: Logo & Burger */}
        <Group wrap="nowrap">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <UnstyledButton onClick={LogClick}>
          <Text fw={800} size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} style={{ whiteSpace: 'nowrap' }}>
            🎵 SONGBOOK Studio
          </Text>
          </UnstyledButton>
        </Group>

        {/* Middle Section: Dynamic Song Settings & Metadata Controls */}
        
          
          {/* 1. Song Title Input */}
          <div style={{ position: 'absolute', left: '40%', transform : 'translateX(-50%, zIndex: 1)'}}>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Song Title"
            variant="unstyled"
            styles={{
              input: {
                fontSize: '16px',
                fontWeight: 700,
                borderBottom: '2px dashed var(--mantine-color-blue-light)',
                padding: '0 4px',
                width: '280px',
                textAlign: 'center',
              },
            }}
          />
          </div>
          
          {/* 2. BPM Counter & Tap Tempo Control */}
          
          <Group gap="xs" wrap="nowrap" justify="flex-end" style={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}>
         
          <Group gap={2} wrap="nowrap" style={{ background: 'var(--mantine-color-gray-1)', padding: '2px 6px', borderRadius: '6px' }}>
            <NumberInput
              value={bpm}
              onChange={(val) => setBpm(Number(val))}
              min={40}
              max={250}
              variant="unstyled"
              allowNegative={false}
              allowDecimal={false}
              hideControls={false}
              styles={{
                 input: { width: '65px', fontWeight: 600, textAlign: 'center', fontSize: '15px' },
                 controls: {display: 'flex'}
                }}
            />
            <Text size="xs" c="dimmed" fw={700} pr={4}>BPM</Text>
            <Button size="xs" compact="true" variant="light" color="blue" onClick={handleTapTempo} styles={{ root: { padding: '0 8px', height: '24px' } }}>
              Tap
            </Button>
          </Group>

          {/* 3. Time Signature Dropdown */}
          <Select
            value={timeSig}
            onChange={setTimeSig}
            data={['4/4', '3/4', '6/8', '2/4', '5/4']}
            variant="unstyled"
            allowDeselect={false}
            withCheckIcon={false}
            styles={{
              input: {
                width: '60px',
                fontWeight: 600,
                fontSize: '14px',
                background: 'var(--mantine-color-blue-light)',
                color: 'var(--mantine-color-blue-filled)',
                borderRadius: '6px',
                textAlign: 'center',
                height: '28px',
              
              },
            }}
          />

          {/* 4. Key Selector Dropdown */}
          <Select
            value={songKey}
            onChange={setSongKey}
            data={[
              'C Major', 'G Major', 'D Major', 'A Major', 'E Major',
              'A Minor', 'E Minor', 'B Minor', 'F# Minor', 'C# Minor'
            ]}
            variant="unstyled"
            allowDeselect={false}
            searchable
            withCheckIcon={false}
           
            styles={{
              input: {
                width: '90px',
                fontWeight: 600,
                fontSize: '14px',
                background: 'var(--mantine-color-cyan-light)',
                color: 'var(--mantine-color-cyan-filled)',
                borderRadius: '6px',
                textAlign: 'center',
                height: '28px',
              },
            }}
          />
        

  
        </Group>

      </Group>
    </AppShell.Header>
  );
}
