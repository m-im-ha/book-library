import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ReadBooksContext = createContext();

export function ReadbooksProvider({ children }) {
  const [readBooks, setReadBooks] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [books, setBooks] = useState([]);

  function addToRead(book) {
    setReadBooks((prevBook) => {
      const isBookInList = prevBook.some((b) => b.title === book.title);
      if (!isBookInList) {
        return [...prevBook, book];
      }
      return prevBook;
    });
  }

  useEffect(() => {
    async function fetchBooks() {
      if (!isFetched) {
        try {
          const response = await axios.get(
            "https://openlibrary.org/subjects/fiction.json?limit=24"
          );
          const fetchedData = response.data.works;
          const booksData = await Promise.all(
            fetchedData.map(async (book) => {
              const bookCover = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
              const bookTitle = book.title;
              const bookAuthor = book.authors[0].name;
              const key = book.key;
              return {
                bookTitle,
                bookCover,
                bookAuthor,
                key,
              };
            })
          );
          setBooks(booksData);
          setIsFetched(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchBooks();
  }, [isFetched]);

  return (
    <ReadBooksContext.Provider value={{ readBooks, addToRead, books }}>
      {children}
    </ReadBooksContext.Provider>
  );
}
