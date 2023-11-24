import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Root from "./root";
import  ErrorPage  from "../pages/ErrorPage";
import {CardContact} from "./contact";
import Root, {loader as rootLoader, action as rootAction} from "./root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action:rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <CardContact />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
