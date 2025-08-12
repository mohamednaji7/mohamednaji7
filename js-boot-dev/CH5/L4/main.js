class Contact {
    constructor(name, phoneNumber) {
      this.name = name;
      this._phoneNumber = phoneNumber;
    }
  
    // ?
    set phoneNumber(value){
        if (value.length !== 10){
            throw new Error("Invalid phone number.");
        }
        this._phoneNumber = value;
    }
    get phoneNumber(){
        // return this._phoneNumber;
        let number = this._phoneNumber;
        // log phone number abd its length
        // console.log(`Phone number: ${number}, Length: ${number.length}`); 
        return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`
    }
  }
  
  // don't touch below this line
  
  export { Contact };
  