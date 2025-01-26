import { useState, useEffect } from "react";
import { TextInput, Popover, Box, Text } from "@mantine/core";
import { fetchBooksByKeyWord } from "@/services/api";
import { TextInputProps, Book } from "@/types/books";

export function Input({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: TextInputProps) {
  const [opened, setOpened] = useState(false);
  const [books, setBooks] = useState<Book[] | null>(null);
  useEffect(() => {
    const loadBooks = async () => {
      try {
        if (searchQuery !== "") {
          const data = await fetchBooksByKeyWord(searchQuery);
          setBooks(data);
        }
      } catch (err) {
        ("Sorry, either this book isn't in our collection yet, or no book or genre were selected. We apologize for the inconvenience.");
      }
    };

    loadBooks();
  }, [searchQuery]);
  Array.isArray(books);

  const highlightKeyword = (text: string, keyword: string | number | undefined) => {
    if (!keyword) {
      return text;
    }

    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: "bold", color: "#f6b319" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Popover
      width="target"
      position="bottom"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <TextInput
          w="13%"
          value={searchQuery}
          placeholder="search by title, author, ISBN"
          onChange={(e) => {
            onSearchChange(e.target.value);
            setOpened(e.target.value.length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit(searchQuery);
              setOpened(false);
            }
          }}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Box>
          {books !== null ? (
            books.map((book, index) => (              
              <Text
                key={index}
                size="sm"
                onClick={() => {
                  const field = book.field;
                  const value = book[field];
                  onSearchChange(value as string);
                  onSearchSubmit(value);
                  setOpened(false);
                }}
                style={{
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {highlightKeyword(book[book.field] as string, searchQuery)}
              </Text>
            ))
          ) : (
            <Text size="sm" color="dimmed">
              No matches found
            </Text>
          )}
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}
