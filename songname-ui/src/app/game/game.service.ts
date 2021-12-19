import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Player} from "./player.model";
import {GameConfigData} from "./game-config-data.model";
import {TurnData} from "./turn-data.model";

@Injectable()
export class GameService {

  constructor(private http: HttpClient) {
  }

  fetchCreateUuid(): Observable<string> {
    return this.http.get<string>(environment.apiURL + '/api/game/uuid')
      .pipe(map(response => {
        return response;
      }));
  }

  fetchPlayers(uuid: string): Observable<Player[]> {
    return this.http.get<Player[]>(environment.apiURL + '/api/game/' + uuid + '/players')
      .pipe(map(responseData => {
        let players: Player[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            let data = {...responseData[key]};
            for (const key2 in data) {
              players.push({...data[key2]});
            }
          }
        }
        return players;
      }));
  }

  fetchTurn(uuid: string): Observable<TurnData> {
    return this.http.get<TurnData>(environment.apiURL + '/api/game/' + uuid + '/turn')
      .pipe(map(responseData => {
        return responseData;
      }));
  }

  createGame(uuid: string, data: GameConfigData) {
    return this.http.post(environment.apiURL + '/api/game/' + uuid + '/create?turns=' + data.turns,
      null, {observe: 'response'});
  }

  finishGame(uuid: string) {
    return this.http.post(environment.apiURL + '/api/game/' + uuid + '/finish', null, {observe: 'response'});
  }

  goNextTurn(uuid: string): Observable<boolean> {
    return this.http.post<boolean>(environment.apiURL + '/api/game/' + uuid + '/turn/next', null, {observe: 'response'})
      .pipe(map(response => {
        return response.body;
      }));
  }

  checkAnswer(authorName: string, title: string, uuid: string): Observable<boolean> {
    const songGuessData = {
      authorName: authorName,
      title: title,
      uuid: uuid
    };
    return this.http.post<boolean>(environment.apiURL + '/api/game/check', songGuessData, {observe: 'response'})
      .pipe(map(response => {
        return response.body;
      }));
  }

}
