import { useState } from 'react';
import { AppShell, Group, Burger, Text, TextInput, NumberInput, Select, Button, UnstyledButton, Menu, ActionIcon } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

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
      if (diff < 2000) { 
        const calculatedBpm = Math.round(60000 / diff);
        setBpm(Math.min(Math.max(calculatedBpm, 40), 250)); 
      }
    }
    setLastTap(now);
  };

  const LogClick = () => {
    console.log("Logo Clicked! open version pop up in future Version 1")
  };

  return (
    <AppShell.Header>
       {/* CSS overrides applied ONLY on mobile views */}
       <style>{`
        @media (max-width: 768px) {
          .responsive-header-container {
            flex-direction: column !important;
            justify-content: center !important;
            height: auto !important;
            padding: 8px 16px !important;
            gap: 6px !important;
          }
          .mobile-row-1 {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          .mobile-title-container {
            position: static !important;
            transform: none !important;
            flex-grow: 1 !important;
            max-width: 220px !important;
            margin: 0 auto !important;
          }
          .mobile-title-container input {
            width: 100% !important;
            text-align: center !important;
            font-size: 15px !important;
          }
          .mobile-display-row {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 10px !important;
            border-top: 1px solid var(--mantine-color-gray-2);
            padding-top: 6px;
          }
        }
      `}</style>
      
      <Group className="responsive-header-container" h="100%" px="md" justify="space-between" wrap="nowrap" style={{ position: 'relative'}}>
        
        {/* ========================================== */}
        {/* ROW 1: Mobile Menu Button (🎵 S), Center Title, & Cog Menu */}
        {/* ========================================== */}
        <Group className="mobile-row-1" wrap="nowrap" style={{ flexGrow: 1 }}>
          
          {/* Left Element: Desktop-Only Burger+Logo OR Mobile-Only 🎵 S Trigger */}
          <Group wrap="nowrap" gap="xs">
            {/* Desktop Layout Layout (Unchanged) */}
            <Group wrap="nowrap" gap="xs" visibleFrom="sm">
              
              <UnstyledButton onClick={LogClick}>
                <Text fw={800} size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} style={{ whiteSpace: 'nowrap' }}>
                  🎵 SONGBOOK Studio
                </Text>
              </UnstyledButton>
            </Group>

            {/* Mobile Layout Layout: Clicking "🎵 S" triggers the sidebar navigation layout toggle */}
            <UnstyledButton onClick={toggle} hiddenFrom="sm" style={{ padding: '4px 0' }}>
              <Text fw={800} size="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} style={{ whiteSpace: 'nowrap' }}>
                {opened ? '❌ S' : '🎵 S'} {/* Subtle UX detail: toggles icon if layout is currently open */}
              </Text>
            </UnstyledButton>
          </Group>

          {/* Middle Element: Perfectly Centered Title Input (Desktop and Mobile) */}
          <div className="mobile-title-container" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
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
          
          {/* Right Element: Mobile-Only Settings Cog */}
          <Group hiddenFrom="sm">
            <Menu shadow="md" width={220} position="bottom-end" withArrow>
              <Menu.Target>
              <ActionIcon variant="subtle" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} color="blue" size="md" style={{ marginRight: '-15px' }}>
              <svg 
                xmlns="http://w3.org" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown p="xs">
                <Menu.Label>Edit Song</Menu.Label>
                
                {/* BPM Fields */}
                <div style={{ padding: '4px 6px' }}>
                  <Text size="xs" fw={700} c="dimmed" mb={2}>BPM</Text>
                  <Group gap={4} wrap="nowrap">
                    <NumberInput value={bpm} onChange={(val) => setBpm(Number(val))} min={40} max={250} size="xs" />
                    <Button size="xs" variant="light" onClick={handleTapTempo}>Tap</Button>
                  </Group>
                </div>

                <Menu.Divider />

                {/* Time Signature */}
                <div style={{ padding: '4px 6px' }}>
                  <Text size="xs" fw={700} c="dimmed" mb={2}>Time Signature</Text>
                  <Select value={timeSig} onChange={setTimeSig} data={['4/4', '3/4', '6/8', '2/4', '5/4']} size="xs" allowDeselect={false} />
                </div>

                <Menu.Divider />

                {/* Key Selector */}
                <div style={{ padding: '4px 6px' }}>
                  <Text size="xs" fw={700} c="dimmed" mb={2}>Key</Text>
                  <Select value={songKey} onChange={setSongKey} data={['C Major', 'G Major', 'D Major', 'A Major', 'E Major', 'A Minor', 'E Minor', 'B Minor']} size="xs" allowDeselect={false} />
                </div>
              </Menu.Dropdown>
            </Menu>
          </Group>

          {/* Desktop Right Alignment Spacer */}
          <div style={{ width: '1px' }} visibleFrom="sm" />
        </Group>
        
        {/* ========================================== */}
        {/* ROW 2: Mobile Status Labels vs Desktop Controls */}
        {/* ========================================== */}
        
        {/* MOBILE VIEW TEXT LABELS */}
        <Group className="mobile-display-row" hiddenFrom="sm">
          <Text size="xs" fw={700} c="blue">{bpm} BPM</Text>
          <Text size="xs" fw={600} c="dimmed">•</Text>
          <Text size="xs" fw={700} c="indigo">{timeSig}</Text>
          <Text size="xs" fw={600} c="dimmed">•</Text>
          <Text size="xs" fw={700} c="cyan">{songKey}</Text>
        </Group>

        {/* UNTOUCHED ORIGINAL DESKTOP CONTROLS ROW */}
        <Group visibleFrom="sm" gap="xs" wrap="nowrap" style={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}>
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
