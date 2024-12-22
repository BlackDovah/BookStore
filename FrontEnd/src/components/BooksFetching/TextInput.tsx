import React from "react";
import { TextInput } from "@mantine/core";

interface TextInputProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export function Input({ searchQuery, onSearchChange, onSearchSubmit }: TextInputProps) {
  return (
    <TextInput
      value={searchQuery}
      placeholder="Search by title, author, ISBN, genre"
      onChange={(event) => onSearchChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onSearchSubmit();
        }
      }}
    />
  );
}
