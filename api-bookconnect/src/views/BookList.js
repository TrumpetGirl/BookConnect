// Modelo de la clase libro
export default class Book {

  constructor(id, title, publicationYear, image_path, author, genre, authorId, genreId) {
    this.id = id;
    this.title = title;
    this.publicationYear = publicationYear;
    this.image_path = image_path;
    this.author = author;
    this.genre = genre;
    this.authorId = authorId;
    this.genreId = genreId;
  }
  
}




