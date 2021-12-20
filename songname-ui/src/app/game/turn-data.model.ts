import {Player} from "./player.model";

export class TurnData {

  player: Player;
  songUuid: string;
  songAuthorsCount: number;
  turn: number;

  constructor(player: Player, songUuid: string, songAuthorsCount: number, turn: number) {
    this.player = player;
    this.songUuid = songUuid;
    this.songAuthorsCount = songAuthorsCount;
    this.turn = turn;
  }

}
