// Modelo de la clase usuario
export default class UserProfile {

    constructor(id, username, email, birth_date, image_path, roleId, role) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.birth_date = birth_date;
      this.image_path = image_path;
      this.roleId = roleId;
      this.role = role;
    }
  
  }