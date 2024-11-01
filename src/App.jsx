import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Error from "./ui/Error"
import Home from "./ui/Home"
import ListedBooks from "./ui/ListedBooks"
import PagesToRead from "./ui/PagesToRead"

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
