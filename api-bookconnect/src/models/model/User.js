// Modelo de la clase usuario
export default class User {

    constructor(id, username, email, password, birth_date, image_path, role) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.birth_date = birth_date;
      this.image_path = image_path;
      this.role = role;
    }
  
  }