import { Image, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { CategoryBooks, Book } from "@/types/books";
import * as APIs from "@/services/api";

type BooksDisplayProps = {
  search: string | number;
  category: string;
};

export function BooksDisplay({ search, category }: BooksDisplayProps) {
  const [books, setBooks] = useState<CategoryBooks | Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        if (search !== "") {
          const data = await APIs.fetchBooksByKeyWord(search);
          setBooks(data);
          setError(null);
        } else if (category === "All Genres") {
          const data = await APIs.fetchBooks();
          setBooks(data as CategoryBooks);
          setError(null);
        } else if (category !== "All Genres") {
          const data = await APIs.fetchBooksByCategory(category);
          setBooks(data as CategoryBooks);
          setError(null);
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

  if (Array.isArray(books)) {
    return (
      <div>
        <Title c="#557c3e" className="flex text-6xl py-4 mb-8">
          Search Results
        </Title>
        <div className="relative grid grid-cols-3">
          {books.map((book, index) => (
            <div key={index} className="flex">
              <Image
                src={book.img}
                alt={`${book.title} cover`}
                style={{
                  width: "60%",
                  height: "90%",
                  marginRight: "10px",
                  marginBottom: "30px",
                }}
              />
              <div className="">
                <strong className="flex text-lg">{book.title}</strong> by{" "}
                {book.author} (ISBN: {book.ISBN})
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {Object.entries(books).map(([genre, genreBooks]) => (
        <div key={genre}>
          <Title c="#557c3e" className="flex text-6xl py-4 mb-8">
            {genre} Books
          </Title>
          <div className="relative grid grid-cols-3">
            {Object.entries(genreBooks).map(([id, book]) => {
              const bookDetails = book as Book;
              return (
                <div key={id} className="flex">
                  <Image
                    src={bookDetails.img}
                    alt={`${bookDetails.title} cover`}
                    style={{
                      width: "60%",
                      height: "90%",
                      marginRight: "10px",
                      marginBottom: "30px",
                    }}
                  />
                  <div className="">
                    <strong className="flex text-lg">
                      {bookDetails.title}
                    </strong>{" "}
                    by {bookDetails.author} (ISBN: {bookDetails.ISBN})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
