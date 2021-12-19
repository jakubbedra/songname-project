import {Author} from "../authors/author.model";

export class Song {
  public uuid: string;
  public title: string;
  public author: string;
  //public authors: Author[];

  constructor(uuid: string, title: string, author: string/*authors: Author[]*/) {
    this.uuid = uuid;
    this.title = title;
    this.author = author;
    //this.authors = authors;
  }
}
