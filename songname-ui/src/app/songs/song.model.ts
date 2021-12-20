import {Author} from "../authors/author.model";

export class Song {
  public uuid: string;
  public title: string;
  public authors: string[];

  constructor(uuid: string, title: string, authors: string[]) {
    this.uuid = uuid;
    this.title = title;
    this.authors = authors;
  }
}
