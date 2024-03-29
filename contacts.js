import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

async function saveFile(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

export async function listContacts() {
  let contacts = [];
  try {
    const fileBuffer = await fs.readFile(contactsPath);
    const fileText = fileBuffer.toString();
    contacts = JSON.parse(fileText);
  } catch (error) {
    console.log(error);
  }
  return contacts;
}

export async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  let contacts = [];
  try {
    contacts = await listContacts();
  } catch (error) {
    console.log(error);
  }

  for (let index = 0; index < contacts.length; index++) {
    if (contacts[index].id === contactId) {
      return contacts[index];
    }
  }
  return null;
}

export async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  let contacts = [];
  let contact = null;
  try {
    contacts = await listContacts();
  } catch (error) {
    console.log(error);
  }

  for (let index = 0; index < contacts.length; index++) {
    if (contacts[index].id === contactId) {
      contact = contacts[index];
      contacts.splice(index, 1);
      await saveFile(contacts);
      break;
    }
  }
  return contact;
}

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  let contacts = [];
  try {
    contacts = await listContacts();
  } catch (error) {
    console.log(error);
  }

  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);
  await saveFile(contacts);
  return newContact;
}
