function addToPhonebook(phoneNumber, name, phoneBook) {
  // ?
    const newPhoneBook = new Map(phoneBook);
    newPhoneBook.set(phoneNumber, name);
    return newPhoneBook;

}

// don't touch below this line

export { addToPhonebook };
