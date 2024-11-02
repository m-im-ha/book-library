import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./ui/Home";
import ListedBooks from "./ui/ListedBooks";
import PagesToRead from "./ui/PagesToRead";
import BookDetails from "./ui/BookDetails";
import { ReadbooksProvider } from "./context/ReadbooksProvider";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listedbooks",
        element: <ListedBooks />,
      },
      {
        path: "/readbooks",
        element: <PagesToRead />,
      },
      {
        path: "/book/works/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <ReadbooksProvider>
      <RouterProvider router={router} />
    </ReadbooksProvider>
  );
}

export default App;
