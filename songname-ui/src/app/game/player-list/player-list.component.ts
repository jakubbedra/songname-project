import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../player.model";
import {PlayersService} from "../players.service";
import {GameService} from "../game.service";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  gameUuid: string;
  noPlayersWarning: boolean;
  players: Player[];

  constructor(
    private playersService: PlayersService,
    private gameService: GameService
  ) {
    this.noPlayersWarning = false;
  }

  ngOnInit(): void {
  }

  async fetchPlayers() {
    if(this.gameUuid === undefined) return;
    this.gameService.fetchPlayers(this.gameUuid).subscribe(response => {
      this.players = response;
    });
  }

  onAddPlayer(name: string) {
    this.playersService.addPlayer(name, this.gameUuid).subscribe(response => {
      this.noPlayersWarning = false;
      this.fetchPlayers();
    });
  }

  onDeletePlayer(playerUuid: string) {
    this.playersService.deletePlayer(playerUuid).subscribe(response => {
      this.fetchPlayers();
    });
  }

}
