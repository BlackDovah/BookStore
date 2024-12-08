import { Footer, Text, Container, Group } from '@mantine/core';

const BookstoreFooter = () => (
  <Footer height={60} px="md">
    <Container>
      <Group position="apart">
        <Text size="sm">© 2024 BookStore. All rights reserved.</Text>
        <Group>
          <Text size="sm">Privacy Policy</Text>
          <Text size="sm">Contact</Text>
        </Group>
      </Group>
    </Container>
  </Footer>
);

export default BookstoreFooter;
