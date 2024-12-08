import React, { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Button, Group } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';

const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Router>
          <Group position="right" m="md">
            <Button onClick={toggleColorScheme}>
              {colorScheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </Button>
          </Group>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
