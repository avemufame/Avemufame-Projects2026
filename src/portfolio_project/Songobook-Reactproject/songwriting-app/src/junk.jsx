  // 1. Establish state variables to control the grid size allocations (Total must always equal 12)
  const [tableOneWidth, setTableOneWidth] = useState(6); // Defaults to half screen
  const [tableTwoWidth, setTableTwoWidth] = useState(3);
  const [tableThreeWidth, setTableThreeWidth] = useState(3);

  // 2. Action method to expand Table 1 and compress the others
  const maximizeTableOne = () => {
    setTableOneWidth(8);  // Grows larger
    setTableTwoWidth(2);  // Compresses smaller
    setTableThreeWidth(2); // Compresses smaller
  };

  // 3. Action method to reset them back to baseline sizes
  const resetLayout = () => {
    setTableOneWidth(6);
    setTableTwoWidth(3);
    setTableThreeWidth(3);
  };



      {/* 2. TABELLA HEADER (Lunga e a larghezza intera) */}
      <Stack gap="xs">
        <Title order={4} c="dimmed">📊 Project Overview & Key Data</Title>
        <Table withBorder layout="fixed">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Project Name</Table.Th>
              <Table.Th>BPM / Key</Table.Th>
              <Table.Th>Total Verses</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          
          <Table.Tbody>
            <Table.Tr>
              <Table.Td style={{ fontWeight: 'bold' }}>Midnight Melodies</Table.Td>
              <Table.Td>120 BPM - A Minor</Table.Td>
              <Table.Td>4 Sections</Table.Td>
              <Table.Td style={{ color: 'green' }}>In Progress</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Stack>

  
<Grid gutter="md">

<Grid.Col span={6}>
  <Stack gap="xs">
    {/* Clean, distinct header tracking */}
    <Title order={4} c="blue">📋 Active Verses</Title> 
    
    <Table withBorder>
      {/* Table contents */}gdfgdgdfgdfgfdgfdgdfgdfgdfgfdgfdgfdgfdgfdgdf
    </Table>
  </Stack>

  <Stack gap="xs">
    {/* Clean, distinct header tracking */}
    <Title order={4} c="blue">📋 Active Verses</Title> 
    
    <Table withBorder>
      {/* Table contents */}
    </Table>
  </Stack>


</Grid.Col>
      </Grid>








    <Stack gap="xl">
    {/* Menu Row allowing you to change your workspace proportions */}
    <Group>
      <Button size="xs" onClick={maximizeTableOne}>🔍 Maximize Lyrics Table</Button>
      <Button size="xs" variant="outline" onClick={resetLayout}>🔄 Equal Balance</Button>
    </Group>

    {/* The main workspace Grid container wrapper */}
    <Grid gutter="md">
      
      {/* TABLE 1: Linked to dynamic width state */}
      <Grid.Col span={tableOneWidth}>
        <Stack gap="xs">
          <Title order={4} c="blue">📝 Lyrics Structure</Title>
          <Table withBorder>{/* Table Data */}dfgfdgdfgfdgfdgfdgfdgfdgdf</Table>
        </Stack>
      </Grid.Col>

      {/* TABLE 2: Linked to dynamic width state */}
      <Grid.Col span={tableTwoWidth}>
        <Stack gap="xs">
          <Title order={4} c="green">🎸 Chord Progressions</Title>
          <Table withBorder>{/* Table Data */}fdgfdgfdgfdgfdgdfgdfgfdgdf</Table>
        </Stack>
      </Grid.Col>

      {/* TABLE 3: Linked to dynamic width state */}
      <Grid.Col span={tableThreeWidth}>
        <Stack gap="xs">
          <Title order={4} c="orange">📚 Rhyme Bank</Title>
          <Table withBorder>{/* Table Data */}gfdgfdgfdgfdgfdgfdgfdgdfgdfgfdgdfgfdgd</Table>
        </Stack>
      </Grid.Col>

    </Grid>
  </Stack>

<Group grow align="flex-start">
<Table>
  dsfsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsf
</Table>
<Table>
  dsfsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsf
</Table>

<Table>
  dsfsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsf
</Table>


</Group>







    
<Stack gap="xl">
{/* Menu Row allowing you to change your workspace proportions */}
<Group>
  <Button size="xs" onClick={maximizeTableOne}>🔍 Maximize Lyrics Table</Button>
  <Button size="xs" variant="outline" onClick={resetLayout}>🔄 Equal Balance</Button>
</Group>

{/* The main workspace Grid container wrapper */}
<Grid gutter="md">
  
  {/* TABLE 1: Linked to dynamic width state */}
  <Grid.Col span={tableOneWidth}>
    <Stack gap="xs">
      <Title order={4} c="blue">📝 Lyrics Structure</Title>
      <Table withBorder>{/* Table Data */}dfgfdgdfgfdgfdgfdgfdgfdgdf</Table>
    </Stack>
  </Grid.Col>

  {/* TABLE 2: Linked to dynamic width state */}
  <Grid.Col span={tableTwoWidth}>
    <Stack gap="xs">
      <Title order={4} c="green">🎸 Chord Progressions</Title>
      <Table withBorder>{/* Table Data */}fdgfdgfdgfdgfdgdfgdfgfdgdf</Table>
    </Stack>
  </Grid.Col>

  {/* TABLE 3: Linked to dynamic width state */}
  <Grid.Col span={tableThreeWidth}>
    <Stack gap="xs">
      <Title order={4} c="orange">📚 Rhyme Bank</Title>
      <Table withBorder>{/* Table Data */}gfdgfdgfdgfdgfdgfdgfdgdfgdfgfdgdfgfdgd</Table>
    </Stack>
  </Grid.Col>

</Grid>
</Stack>
