const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  
  return JSON.parse(data);
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  } catch (error) {
    console.error('Сталася помилка при отриманні контакту за його ID:', error.message);
    return null;
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error('Сталася помилка при видаленні контакту:', error.message);
    return null;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error('Сталася помилка при додаванні контакту:', error.message);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};