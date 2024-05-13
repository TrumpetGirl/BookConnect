// Modelo de la clase usuario
export default class User {

    constructor(id, name, password, birthdayDate, role) {
      this.id = id;
      this.name = name;
      this.password = password;
      this.publicationYear = birthdayDate;
      this.role = role;
    }
  
  }