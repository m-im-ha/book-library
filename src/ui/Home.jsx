import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReadBooksContext } from "../context/ReadbooksProvider";

function Home() {
  const [books, setBooks] = useState([]);
//   console.log(books);
const {books : contextBooks} = useContext(ReadBooksContext);

  useEffect(() => {
    if(contextBooks.length === 0){

      async function fetchRandomBooks() {
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
              const response = await axios.get(
                `https://openlibrary.org${key}.json`
              );
              const fetchedDataTwo = response.data;
              console.log(fetchedDataTwo);
              const description = typeof fetchedDataTwo.description === "object" ? fetchedDataTwo.description.value.split(" ").splice(0,15).join(" ") : fetchedDataTwo.description.split(" ").splice(0,15).join(" ") || "no data";
              const publish_date = fetchedDataTwo.first_publish_date;
              const genre = fetchedDataTwo.subjects.splice(0, 2);
              // console.log(fetchedData);
              return {
                bookTitle,
                bookCover,
                bookAuthor,
                description,
                publish_date,
                genre,
                key
              };
            })
          );
          setBooks(booksData);
        } catch (error) {
          console.error(error);
        }
      }
      fetchRandomBooks();
    }
  }, []);

  const booksToDisplay = contextBooks.length > 0 ? contextBooks : books;

  return (
    <div>
      <div className="card lg:card-side bg-base-100 rounded-none">
        <div className="card-body">
          <h2 className="card-title">Books to freshen up your bookshelf</h2>
          <div className="card-actions">
            <button className="btn btn-primary">
              <Link to="/listedbooks">View The List</Link>
            </button>
          </div>
        </div>
        <figure>
          <img className="w-72" src="./assets/book-cover.jpg" alt="Album" />
        </figure>
      </div>
      <div>
        <h3 className="text-center mt-4 mb-6">Books</h3>
        <div>
          {booksToDisplay.length > 0 && (
            <div className="grid grid-cols-3">
              {booksToDisplay.map((book) => (
                <Link to={`/book/works/${book.key.split("/").pop()}`} key={book.key}>
                  <div
                    className="card bg-base-100 w-96 shadow-xl"
                    
                  >
                    <figure>
                      <img src={book.bookCover} alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Title : {book.bookTitle}</h2>
                      <h2 className="card-title">Author : {book.bookAuthor}</h2>
                      <h4>published : {book.publish_date || "no data"}</h4>
                      <p>
                        description :{" "}
                        {book.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
