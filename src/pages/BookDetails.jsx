import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Title, Text, Image, Button, Group } from '@mantine/core';

const BOOKS_API_URL = '/api/books'; // Replace with actual API endpoint

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BOOKS_API_URL}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  if (!book) {
    return <Text>No book found</Text>;
  }

  return (
    <Container>
      <Group position="center">
        <Image src={book.cover} alt={book.title} width={200} />
      </Group>
      <Title mt="lg">{book.title}</Title>
      <Text color="dimmed" size="sm" mb="lg">{`By ${book.author}`}</Text>
      <Text size="md" mt="md">{book.description}</Text>
      <Text weight={700} size="lg" mt="md">{`Price: $${book.price}`}</Text>
      <Group mt="lg">
        <Button variant="light" color="blue" size="md">Add to Cart</Button>
        <Button variant="default" size="md">Back to Home</Button>
      </Group>
    </Container>
  );
};

export default BookDetails;
