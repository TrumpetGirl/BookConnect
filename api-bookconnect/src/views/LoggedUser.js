// Modelo de la clase usuario logueado
export default class LoggedUser {
    constructor(id, username, image_path, role) {
      this.id = id;
      this.username = username;
      this.image_path = image_path;
      this.role = role;
    }
  
  }