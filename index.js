const contacts = require('./contacts');
const { program } = require('commander');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// ------- Variant 1
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

invokeAction(options);

// ------- Variant 2
// console.log(process.argv);

// const actionIndex = process.argv.indexOf("--action");

// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   const id = process.argv[actionIndex + 2];
//   const name = process.argv[actionIndex + 3];
//   const email = process.argv[actionIndex + 4];
//   const phone = process.argv[actionIndex + 5];

//   console.log(action, id, name, email, phone);

//   invokeAction({ action, id, name, email, phone });
// }