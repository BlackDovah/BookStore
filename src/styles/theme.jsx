/* eslint-disable react/prop-types */

import { MantineProvider } from '@mantine/core';

const ThemeProvider = ({ children }) => (
  <MantineProvider
    theme={{
      colorScheme: 'light', // or 'dark'
      primaryColor: 'blue',
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    {children}
  </MantineProvider>
);

export default ThemeProvider;