import { Grid, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { CategoryBooks, Book } from "@/types/books";
import * as APIs from "@/services/api";

interface BooksDisplayProps {
  search: string;
  category: string;
}

export function BooksDisplay({ search, category }: BooksDisplayProps) {
  const [books, setBooks] = useState<CategoryBooks | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        if (category === "All Genres") {
          const data = await APIs.fetchBooks();
          setBooks(data as CategoryBooks);
        } else if (category !== "All Genres") {
          const data = await APIs.fetchBooksByCategory(category);
          setBooks(data as CategoryBooks);
        } else if (search) {
          const data = await APIs.fetchBooksByTitle(search);
          setBooks(data as CategoryBooks);
        }
      } catch (err) {
        setError("Failed to load books");
      }
    };

    loadBooks();
  }, [category, search]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!books) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Object.entries(books).map(([genre, genreBooks]) => (
        <div key={genre}>
          <h2>{genre} Books</h2>
          <ul>
            {Object.entries(genreBooks).map(([id, book]) => {
              const bookDetails = book as Book;
              return (
                <li key={id}>
                  <Grid gutter={{base: 5, xs: 'md', md: 'xl', xl: 50}}>
                    <Grid.Col span={4}>
                      <Image
                        src={bookDetails.img}
                        alt={`${bookDetails.title} cover`}
                        style={{ width: "200px", marginRight: "10px" }}
                      />
                      <strong>{bookDetails.title}</strong> by{" "}
                      {bookDetails.author} (ISBN: {bookDetails.ISBN})
                    </Grid.Col>
                  </Grid>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
