export class GameConfigData {

  turns: string;
  excludedAuthorUuids: string[];

  constructor(turns: string, excludedAuthorUuids: string[]) {
    this.turns = turns;
    this.excludedAuthorUuids = excludedAuthorUuids;
  }

}
