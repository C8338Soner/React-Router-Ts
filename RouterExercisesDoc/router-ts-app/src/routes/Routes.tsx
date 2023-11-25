import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import CardContact, { loader as contactLoader , action as contactAction } from "./contact";
import Root, { loader as rootLoader, action as rootAction } from "./root";
import EditContact, { action as editAction } from "./edit";
import { action as destroyAction } from "./destroy";
import Index  from "../routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index:true,
        element:<Index/>,
      },
      {
        path: "contacts/:contactId",
        element: <CardContact />,
        loader: contactLoader,
        action:contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction as (args: any) => Promise<any>,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction as (args: any) => Promise<any>,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
