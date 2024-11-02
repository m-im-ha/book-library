import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState("");
  // console.log(book);

  useEffect(() => {
    async function fetchBook(id) {
      try {
        const response = await axios.get(
          `https://openlibrary.org/works/${id}.json`
        );
        const bookData = response.data;
        setBook({
          title: bookData.title,
          description: bookData.description,
          publish_date: bookData.first_publish_date,
          genre: bookData.subjects.splice(0, 4).join(", "),
        });
        if (bookData.authors[0].author?.key) {
          const response = await axios.get(
            `https://openlibrary.org${bookData.authors[0].author.key}.json`
          );
          const authorData = response.data;
          setAuthor(authorData.name);
        }
        // console.log(bookData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBook(id);
  }, [id]);

  return (
    <div>
      {book ? (
        <div>
          <h1>Title : {book.title}</h1>
          <h3>Author : {author}</h3>
          <h5>Publish : {book.publish_date || "no data"}</h5>
          <h6>Genre : {book.genre}</h6>
          <h6>Descriptions : {book.description}</h6>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <div className="flex gap-4 mt-5 mb-8">
        <button className="btn btn-primary">Read</button>
        <button className="btn btn-secondary">Wishlist</button>
      </div>
    </div>
  );
}

export default BookDetails;
