import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';

import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import "./output.css";
import { BooksContextProvider } from "./components/Contexts/BooksContext";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BooksContextProvider>
        <Router />
      </BooksContextProvider>
    </MantineProvider>
  );
}
