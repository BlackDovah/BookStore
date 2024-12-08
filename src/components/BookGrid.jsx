/* eslint-disable react/prop-types */

import { SimpleGrid, Container } from '@mantine/core';
import BookCard from './BookCard';

const BookGrid = ({ books }) => (
  <Container>
    <SimpleGrid cols={4} spacing="lg" breakpoints={[{ maxWidth: 768, cols: 2 }]}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          price={book.price}
          cover={book.cover}
        />
      ))}
    </SimpleGrid>
  </Container>
);

export default BookGrid;
