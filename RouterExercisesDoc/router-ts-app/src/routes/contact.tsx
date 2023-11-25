import React from "react";
import { Form, LoaderFunctionArgs, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../data/contacts";
import type { ContactType } from "../data/contacts";

export type FavoriteProps = {
  contact: ContactType;
};

interface LoaderData {
  contact: ContactType | null;
}

export async function loader(args:LoaderFunctionArgs): Promise<LoaderData> {
  const contactId = args.params.contactId|| "";
  const contact = await getContact(contactId);
  console.log("loader func return", contact);
  //console.log("params", params);

  if (contact === null) {
    // Handle the case where contact is null
    throw new Error("Contact not found");
  }

  return { contact };
}

function Favorite({ contact }: FavoriteProps) {
  let favorite = contact.favorite;
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
export async function action({ request, params }:any) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function CardContact() {
  const { contact } = useLoaderData() as { contact: ContactType };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || undefined}
          alt="Contact Avatar"
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
