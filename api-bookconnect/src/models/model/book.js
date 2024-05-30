// Modelo de la clase libro
export default class Book {

  constructor(id, isbn, title, publicationYear, synopsis, image_path, author, genre) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.publicationYear = publicationYear;
    this.synopsis = synopsis;
    this.image_path = image_path;
    this.author = author;
    this.genre = genre;
  }
  
}




