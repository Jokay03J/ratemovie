import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import New from "./pages/New";

function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/movie/:id", element: <Movie /> },
    { path: "new", element: <New /> },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
