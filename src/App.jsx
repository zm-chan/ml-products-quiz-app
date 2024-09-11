import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorElement from "./ErrorElement";
import Quiz from "./Quiz";
import Products from "./Products";
import AppLayout from "./AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Quiz /> },
      { path: "/products", element: <Products /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
