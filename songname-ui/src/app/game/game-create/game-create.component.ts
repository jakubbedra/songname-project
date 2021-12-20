import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {GameService} from "../game.service";
import {PlayerListComponent} from "../player-list/player-list.component";
import {GameConfigData} from "../game-config-data.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  @Output() uuidFetchedEvent = new EventEmitter<void>();
  @ViewChild('playerList', {static: false}) playerList: PlayerListComponent;

  uuid: string;

  constructor(
    private gameService: GameService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchUuid();
  }

  fetchUuid() {
    this.gameService.fetchCreateUuid().subscribe(response => {
      this.uuid = response;
      this.playerList.gameUuid = this.uuid;
      this.playerList.fetchPlayers();
    });
  }

  onStartGame(turns: string, excludedAuthorUuids: string[]) {
    if (this.playerList.players.length === 0) {
      this.playerList.noPlayersWarning = true;
      return;
    }
    const gameConfigData = new GameConfigData(turns, excludedAuthorUuids);
    this.gameService.createGame(this.uuid, gameConfigData).subscribe(response => {
      this.router.navigate(['/game/local/' + this.uuid]);
    });
  }

}
