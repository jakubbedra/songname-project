import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Player} from "./player.model";
import {map} from "rxjs/operators";

@Injectable()
export class PlayersService {

  constructor(private http: HttpClient) {
  }

  addPlayer(name: string, gameUuid: string): Observable<any> {
    const playerData = {gameUuid: gameUuid, name: name};
    return this.http.post(environment.apiURL + '/api/players', playerData, {observe: 'response'});
  }

  fetchPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(environment.apiURL + '/api/players')
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

  fetchPlayer(uuid: string): Observable<Player> {
    return this.http.get<Player>(environment.apiURL + '/api/players/' + uuid)
      .pipe(map(responseData => {
        return responseData;
      }));
  }

  updatePlayer(uuid: string, points: number): Observable<any> {
    const pointsData = {points: points};
    return this.http.put(environment.apiURL + '/api/players/' + uuid, pointsData, {observe: 'response'});
  }

  deletePlayer(uuid: string): Observable<any> {
    return this.http.delete(environment.apiURL + '/api/players/' + uuid, {observe: 'response'});
  }

}
