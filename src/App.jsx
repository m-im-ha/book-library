import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Error from "./ui/Error"
import Home from "./ui/Home"
import ListedBooks from "./ui/ListedBooks"
import PagesToRead from "./ui/PagesToRead"
import BookDetails from "./ui/BookDetails"

const router = createBrowserRouter([
  {
    element : <AppLayout/>,
    errorElement : <Error/>,
    children : [
      {
        path: "/",
        element : <Home/>
      },
      {
        path: "/listedbooks",
        element : <ListedBooks/>
      },
      {
        path: "/pagestoread",
        element : <PagesToRead/>
      },
      {
        path : "/book/works/:id",
        element : <BookDetails/>
      }
    ]

  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
