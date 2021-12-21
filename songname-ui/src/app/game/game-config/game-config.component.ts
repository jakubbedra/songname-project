import {Component, OnInit} from '@angular/core';
import {Author} from "../../authors/author.model";
import {AuthorsService} from "../../authors/authors.service";

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit {

  turns: string;
  allAuthors: Author[];
  selectedAuthorUuids: string[];

  constructor(
    private authorsService: AuthorsService
  ) {
    this.turns = '10';
    this.selectedAuthorUuids = [];
  }

  ngOnInit(): void {
    this.authorsService.fetchAuthors().subscribe(response => {
      this.allAuthors = response;
    });
  }

  onCheck(value: boolean, ind: number) {
    if (value === false) {
      this.selectedAuthorUuids.push(this.allAuthors[ind].uuid);
    } else {
      this.selectedAuthorUuids = this.selectedAuthorUuids.filter(uuid => uuid !== this.allAuthors[ind].uuid);
    }
  }

  onTurnChange(turns: string) {
    this.turns = turns;
  }

}
