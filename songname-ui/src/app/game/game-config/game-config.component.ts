import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit {

  turns: string;

  constructor() {
    this.turns = '10';
  }

  ngOnInit(): void {
  }

  onTurnChange(turns: string) {
    this.turns = turns;
  }

}
