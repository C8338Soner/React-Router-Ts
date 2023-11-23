import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Root from "./root";
import { ErrorPage } from "../pages/ErrorPage";
import {Contact} from "./contact";
import Root, {loader as rootloader} from "./root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootloader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
