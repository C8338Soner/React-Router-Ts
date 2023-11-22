import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
//import { Header } from './Header';
import App from "./App";
import { ProductPage } from "./pages/Product";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
