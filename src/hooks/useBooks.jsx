import { useState, useEffect } from 'react';

const placeholderBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel set in the Roaring Twenties, exploring themes of wealth, love, and the American Dream.',
    price: 10.99,
    cover: 'https://via.placeholder.com/200x300?text=The+Great+Gatsby',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel that delves into a totalitarian society governed by surveillance and propaganda.',
    price: 8.99,
    cover: 'https://via.placeholder.com/200x300?text=1984',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A story of racial injustice and childhood innocence in the Deep South.',
    price: 12.99,
    cover: 'https://via.placeholder.com/200x300?text=To+Kill+a+Mockingbird',
  },
];

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Simulate network delay
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBooks(placeholderBooks);
      } catch (err) {
        setError('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};

export default useBooks;
