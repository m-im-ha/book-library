import { createContext, useState } from "react";

export const ReadBooksContext = createContext();

export function ReadbooksProvider({ children }) {
  const [readBooks, setReadBooks] = useState([]);

  function addToRead(book) {
    setReadBooks((prevBook) => {
      const isBookInList = prevBook.some((b) => b.title === book.title);
      if (!isBookInList) {
        return [...prevBook, book];
      }
      return prevBook;
    });
  }
  return (
    <ReadBooksContext.Provider value={{ readBooks, addToRead }}>
      {children}
    </ReadBooksContext.Provider>
  );
}
