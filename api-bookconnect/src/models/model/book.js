// Modelo de la clase libro
export default class Book {

  constructor(id, isbn, title, publicationYear, author, genre, synopsis, path_image) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.publicationYear = publicationYear;
    this.author = author;
    this.genre = genre;
    this.synopsis = synopsis;
    this.path_image = path_image;
  }
  
}




