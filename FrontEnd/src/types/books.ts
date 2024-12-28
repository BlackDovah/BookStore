export interface Book {
    title: string;
    author: string;
    ISBN: string;
    img?: string;
  }
  
  export interface CategoryBooks {
    [genre: string]: {
      [id: string]: Book;
    };
  }
  
  export type BooksDisplayProps = {
    search: string | number;
    category: string;
  };

  export interface GenreMenuProps {
    selectedCategory: string | undefined;
    onCategorySelect: (category: string) => void;
  }

  export interface TextInputProps {
    searchQuery: string | number;
    onSearchChange: (value: string) => void;
    onSearchSubmit: () => void;
  }
  