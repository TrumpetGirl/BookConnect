// Modelo de la clase usuario
export default class User {

    constructor(id, username, password, birthdayDate, role) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.birthdayDate = birthdayDate;
      this.role = role;
    }
  
  }