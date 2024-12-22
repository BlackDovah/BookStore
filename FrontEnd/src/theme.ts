import { createTheme, Button } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  components: {
    Button: Button.extend({
      styles: {
        root: { backgroundColor: 'rgb(147, 108, 108)' },
        label: { color: 'white' },
        inner: { fontSize: 20 },
      },
    }),
  },
});
