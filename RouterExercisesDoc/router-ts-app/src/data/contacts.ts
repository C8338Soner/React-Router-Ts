import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export type Contact = {
  favorite: any;
  id: string;
  createdAt: number;
  first?: string;
  last?: string;
  // Add other contact properties as needed
}

export async function getContacts(query: string): Promise<Contact[]> {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: Contact[] | null = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact(): Promise<Contact> {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact: Contact = {
      id, createdAt: Date.now(),
      favorite: undefined
  };
  let contacts = await getContacts("");
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string): Promise<Contact | null> {
  await fakeNetwork(`contact:${id}`);
  let contacts: Contact[] | null = await localforage.getItem("contacts");
  let contact = contacts ? contacts.find((c) => c.id === id) : null;
  return contact ?? null;
}

export async function updateContact(
  id: string,
  updates: Partial<Contact>
): Promise<Contact> {
  await fakeNetwork();
  let contacts: Contact[] | null = await localforage.getItem("contacts");
  if (!contacts) throw new Error("No contacts found.");
  let contact = contacts.find((c) => c.id === id);
  if (!contact) throw new Error(`No contact found for ${id}`);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
  let contacts: Contact[] | null = await localforage.getItem("contacts");
  if (!contacts) return false;
  let index = contacts.findIndex((c) => c.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

async function set(contacts: Contact[]): Promise<void> {
  await localforage.setItem("contacts", contacts);
}

// Fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: boolean } = {};

async function fakeNetwork(key?: string): Promise<void> {
  if (!key) {
    fakeCache = {};
  }

  if (key && fakeCache[key]) {
    return;
  }

  if (key) {
    fakeCache[key] = true;
  }

  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}