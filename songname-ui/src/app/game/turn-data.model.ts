import {Player} from "./player.model";

export class TurnData {

  player: Player;
  songUuid: string;
  turn: number;

  constructor(player: Player, songUuid: string, turn: number) {
    this.player = player;
    this.songUuid = songUuid;
    this.turn = turn;
  }

}
