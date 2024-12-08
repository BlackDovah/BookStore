import { Container, Grid, Card, Image, Text, Button, Title, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import useBooks from '../hooks/useBooks';

const Home = () => {
  const { books, loading, error } = useBooks();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  return (
    <Container>
      <Title align="center" my="lg">Bookstore</Title>
      <Grid>
        {books.map((book) => (
          <Grid.Col span={4} key={book.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={book.cover} alt={book.title} />
              </Card.Section>
              <Text weight={500} size="lg" mt="md">{book.title}</Text>
              <Text size="sm" color="dimmed">{`By ${book.author}`}</Text>
              <Group position="apart" mt="md">
                <Text weight={700}>{`$${book.price}`}</Text>
                <Button component={Link} to={`/book/${book.id}`} variant="light" color="blue" size="sm">
                  View Details
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
