import React from "react";
import { TextInput } from "@mantine/core";

interface TextInputProps {
  searchQuery: string | number;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export function Input({ searchQuery, onSearchChange, onSearchSubmit }: TextInputProps) {
  return (
    <TextInput
      w="13%"
      value={searchQuery}
      placeholder="Search by title, author, ISBN"
      onChange={(event) => {onSearchChange(event.target.value);}}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onSearchSubmit();
        }
      }}
    />
  );
}
