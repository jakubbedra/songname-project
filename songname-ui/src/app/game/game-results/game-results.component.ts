import {Component, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {Player} from "../player.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit {

  uuid: string;
  players: Player[];

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.fetchResults();
  }

  fetchResults() {
    this.gameService.fetchPlayers(this.uuid).subscribe(response => {
      this.players = response.sort((a, b) => b.score - a.score);
    });
  }

  onExitGame() {
    this.gameService.finishGame(this.uuid).subscribe(() => {
      this.router.navigate(['/game/local/create']);
    });
  }

}
