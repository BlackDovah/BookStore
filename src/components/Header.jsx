import { Header, Container, Group, Text, Button } from '@mantine/core';

const BookstoreHeader = () => (
  <Header height={60} px="md">
    <Container>
      <Group position="apart">
        <Text size="xl" weight={700}>BookStore</Text>
        <Group>
          <Button variant="light">Home</Button>
          <Button variant="light">Books</Button>
          <Button variant="light">Cart</Button>
        </Group>
      </Group>
    </Container>
  </Header>
);

export default BookstoreHeader;
