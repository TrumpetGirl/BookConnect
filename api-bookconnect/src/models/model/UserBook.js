// Modelo de la clase usuario_libro
export default class UserBook {

    constructor(id, user, book, state, puntuation, review) {
      this.id = id;
      this.user = user;
      this.book = book;
      this.state = state;
      this.puntuation = puntuation;
      this.review = review;
    }
  
  }