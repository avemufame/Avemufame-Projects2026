import { useState, useRef } from 'react';
import { Container, Grid, Card, Title, Text, Textarea, ScrollArea, Group, Button, Tabs, Badge, Stack, useMantineColorScheme, TextInput, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {




  return (


<Container size="fluid" style={{ padding: '20px', height: '100vh', backgroundColor: '#1A1B1E'}}>
    
     
<Stack gap="md" style={{ height: '100%' }}>

        
        {/* TOP PANEL */}
        <Group justify="space-between" align="center">
          <Group>
            <Title order={1} c="blue">📝 Songwriter Studio</Title>
          
            <Stack gap="xs">
            <Group gap="lg" mb="md" mt="xs">
                <TextInput 
                  label="Key" 
                  size="xs" 
                  style={{ width: '70px' }} 
                  
                  
                />
                <TextInput 
                  label="BPM" 
                  size="xs" 
                  style={{ width: '70px' }} 
                  
                  
                />
              </Group>
                
              </Stack>
        </Group>
          
          </Group>
          <Grid gutter="md">
            
            {/* TABLE 1: Linked to dynamic width state */}
            <Grid.Col span='2'>
              <Stack gap="xs">
                <Title order={4} c="blue">📝 Lyrics Structure</Title>
                <Table withBorder>{/* Table Data */}dfgfdgdfgfdgfdgfdgfdgfdgdf</Table>
              </Stack>
            </Grid.Col>

            {/* TABLE 2: Linked to dynamic width state */}
            <Grid.Col span='2'>
              <Stack gap="xs">
                <Title order={4} c="green">🎸 Chord Progressions</Title>
                <Table withBorder>{/* Table Data */}fdgfdgfdgfdgfdgdfgdfgfdgdf</Table>
              </Stack>
            </Grid.Col>

            {/* TABLE 3: Linked to dynamic width state */}
            <Grid.Col span='2'>
              <Stack gap="xs">
                <Title order={4} c="orange">📚 Rhyme Bank</Title>
                <Table withBorder>{/* Table Data */}gfdgfdgfdgfdgfdgfdgfdgdfgdfgfdgdfgfdgd</Table>
              </Stack>
            </Grid.Col>

              </Grid>
              </Stack>
    

    </Container>
  )
  }

export default App
