import { Image, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { CategoryBooks, Book, BooksDisplayProps } from "@/types/books";
import * as APIs from "@/services/api";
import { BookDetailsAndPurchase } from "@/components/BookDetailsAndPurchase/BookDetailsAndPurchase";

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
        setError(
          "Sorry, either this book isn't in our collection yet, or no book or genre were selected. We apologize for the inconvenience."
        );
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
        <Title c="#557c3e" className="flex text-4xl lg:text-3xl md:text-2xl sm:text-xl xsm:text-xl py-4 mb-8 justify-center">
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
                  marginLeft: "30px",
                  marginBottom: "30px",
                }}
              />
              <div className="">
                <strong className="flex text-lg">{book.title}</strong> by{" "}
                {book.author} (ISBN: {book.ISBN})
                <BookDetailsAndPurchase book={book} />
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
          <Title c="#557c3e" className="flex text-4xl lg:text-3xl md:text-2xl sm:text-xl xsm:text-xl py-4 mb-8 justify-center">
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
                      marginLeft: "30px",
                      marginBottom: "30px",
                    }}
                  />
                  <div className="">
                    <strong className="flex text-lg">
                      {bookDetails.title}
                    </strong>{" "}
                    by {bookDetails.author} (ISBN: {bookDetails.ISBN})
                    <BookDetailsAndPurchase book={book} />
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
