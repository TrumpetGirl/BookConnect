// Modelo de la clase usuario
export default class User {

    constructor(id, username, password, email, birth_date, role, image_path) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.birth_date = birth_date;
      this.role = role;
      this.image_path = image_path;
    }
  
  }