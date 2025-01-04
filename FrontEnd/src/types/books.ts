export interface Book {
  title: string;
  author: string;
  ISBN: string;
  img: string;
}

export interface CategoryBooks {
  [genre: string]: {
    [id: string]: Book;
  };
}

export type BooksDisplayProps = {
  search: string | number | undefined;
  category: string | undefined;
};

export interface GenreMenuProps {
  selectedCategory: string | undefined;
  onCategorySelect: (category: string) => void;
}

export interface TextInputProps {
  searchQuery: string | number | undefined;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export type BooksContextProps = {
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
  searchQuery: string | number | undefined;
  setSearchQuery: (value: string | undefined) => void;
  submittedQuery: string | number | undefined;
  setSubmittedQuery: (value: string | number | undefined) => void;
};

export interface CardProps {
  image: string;
  title: string;
  category: string;
}