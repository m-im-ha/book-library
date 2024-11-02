import { useContext } from "react"
import { ReadBooksContext } from "../context/ReadbooksProvider"

function PagesToRead() {
    const {readBooks} = useContext(ReadBooksContext);
    console.log(readBooks);
    return (
        <div>
            Read books : {readBooks.length}
        </div>
    )
}

export default PagesToRead
