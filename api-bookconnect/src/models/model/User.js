// Modelo de la clase usuario
export default class User {

    constructor(id, username, password, birth_date, role, image_path) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.birth_date = birth_date;
      this.role = role;
      this.image_path = image_path;
    }
  
  }