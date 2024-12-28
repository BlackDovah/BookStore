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
  