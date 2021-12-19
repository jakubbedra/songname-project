import {Author} from "../authors/author.model";

export class Song {
  public uuid: string;
  public title: string;
  public author: string;
  public authors: string[];

  constructor(uuid: string, title: string, /*author: string*/authors: string[]) {
    this.uuid = uuid;
    this.title = title;
    //this.author = author;
    this.authors = authors;
  }
}
