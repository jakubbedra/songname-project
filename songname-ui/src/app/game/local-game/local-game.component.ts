import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Player} from "../player.model";
import {GameService} from "../game.service";
import {SongPlayer} from "../../songs/song-player";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayersService} from "../players.service";
import {SongsService} from "../../songs/songs.service";
import {Author} from "../../authors/author.model";

@Component({
  selector: 'app-local-game',
  templateUrl: './local-game.component.html',
  styleUrls: ['./local-game.component.css']
})
export class LocalGameComponent implements OnInit {

  @ViewChild('authors') authorRight: ElementRef;
  @ViewChild('title') titleRight: ElementRef;

  uuid: string;
  songUuid: string;
  songPlayer: SongPlayer;
  players: Player[];
  givenAuthors: Author[];
  authorsCount: number;
  turn: number;
  answerState: number;
  round: number;
  inputDisabled: boolean;

  constructor(
    private gameService: GameService,
    private playersService: PlayersService,
    private songsService: SongsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.turn = 0;
    this.answerState = 0;
    this.round = 1;
    this.inputDisabled = false;
  }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.fetchTurnData();
    this.fetchPlayers();
    this.songPlayer = new SongPlayer(1, 10);
  }

  fetchTurnData() {
    this.gameService.fetchTurn(this.uuid).subscribe(response => {
      this.songUuid = response.songUuid;
      this.authorsCount = response.songAuthorsCount;
      this.givenAuthors = [];
      this.authorsCount = 3;
      for (let i = 0; i < this.authorsCount; i++) {
        this.givenAuthors.push(new Author('uuid', ''));
      }
      this.songPlayer.fetchSong(this.songUuid);
    });
  }

  fetchPlayers() {
    this.gameService.fetchPlayers(this.uuid).subscribe(response => {
      this.players = response;
    });
  }

  onPlay() {
    this.songPlayer.playWithTimeLimit();
  }

  onIncrement() {
    this.songPlayer.incrementTime();
  }

  onAuthorUpdate(name: string, ind: number) {
    this.givenAuthors[ind].name = name;
  }

  onGuess(title: string) {
    this.inputDisabled = true;
    this.titleRight.nativeElement.disabled = true;
    console.log(this.givenAuthors);
    const authorNames: string[] = [];
    for (let author of this.givenAuthors) {
      authorNames.push(author.name);
    }
    this.gameService.checkAnswer(authorNames, title, this.songUuid).subscribe(response => {
      if (response) {
        this.answerState = 1;
      } else {
        this.answerState = -1;
        this.showCorrectAnswer();
      }
      this.updateCurrentPlayerScore();
    });
  }

  showCorrectAnswer() {
    this.songsService.fetchSong(this.songUuid).subscribe(response => {
      let songData = response;
      this.authorRight.nativeElement.value = songData.author;
      this.titleRight.nativeElement.value = songData.title;
    });
  }

  onNextTurn() {
    this.nextTurn();
  }

  updateCurrentPlayerScore() {
    if (this.answerState == 1) {
      this.playersService.updatePlayer(
        this.players[this.turn % this.players.length].uuid,
        this.songPlayer.points
      ).subscribe(() => {
        this.fetchPlayers();
      });
    }
  }

  nextTurn() {
    this.answerState = 0;
    this.turn++;
    this.songPlayer.reset();
    this.round = Math.floor(this.turn / this.players.length) + 1;
    this.gameService.goNextTurn(this.uuid).subscribe(response => {
      if (response) {
        this.fetchTurnData();
        this.resetInput();
      } else {
        this.router.navigate(['game/local/' + this.uuid + '/results']);
      }
    });
  }

  private resetInput() {
    this.inputDisabled = false;
    this.authorRight.nativeElement.value = '';
    this.titleRight.nativeElement.disabled = false;
    this.titleRight.nativeElement.value = '';
  }

}
