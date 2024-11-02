import { Children, createContext, useState } from "react"

export const ReadBooksContext = createContext();

export function ReadbooksProvider() {
    const [readBooks,setReadBooks] = useState([]);

    function addToRead(book){
        setReadBooks((prevBook)=>[...prevBook,book]);
    }
    return (
        <ReadBooksContext.Provider value={{readBooks,addToRead}}>
            {Children}
        </ReadBooksContext.Provider>
    )
}



