import { redirect } from "react-router-dom";
import { deleteContact } from "../data/contacts";

interface ActionParams {
  params: {
    contactId: string;
  };
}

export async function action({ params }: ActionParams) {
  try {
    // Your existing logic
    await deleteContact(params.contactId);
  } catch (error) {
    // Handle the error if needed
    console.error("An error occurred:", error);
    // You can choose to rethrow the error or handle it in some other way
    throw error;
  }

  // This statement will be reachable after the try-catch block
  return redirect("/");
}
