import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Song} from "./song.model";
import {Observable} from "rxjs";

@Injectable()
export class SongsService {

  constructor(private http: HttpClient) {
  }

  addSong(title: string, authorUuids: string[], file: File) {
    const songData = new Blob([JSON.stringify({
      'title': title,
      'authorUuids': authorUuids
    })], {type: "application/json"});
    const formData = new FormData();
    formData.append('info', songData);
    formData.append('file', file);
    return this.http.post(environment.apiURL + '/api/songs', formData, {observe: 'response'});
  }

  fetchSong(uuid: string): Observable<Song> {
    return this.http.get<Song>(environment.apiURL + '/api/songs/' + uuid)
      .pipe(map(responseData => {
        return responseData;
      }));
  }

  fetchSongs(): Observable<Song[]> {
    return this.http.get(environment.apiURL + '/api/songs')
      .pipe(map(responseData => {
        let songs: Song[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            let data = {...responseData[key]};
            for (const key2 in responseData) {
              songs.push({...data[key2]});
            }
          }
        }
        return songs;
      }));
  }

  fetchAuthorSongs(uuid: string): Observable<Song[]> {
    return this.http.get<Song[]>(environment.apiURL + '/api/authors/' + uuid + '/songs')
      .pipe(map(responseData => {
        console.log(responseData);
        let songs: Song[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            let data = {...responseData[key]};
            for (const key2 in data) {
              songs.push({...data[key2]});
            }
          }
        }
        return songs;
      }));
  }

  updateSong(uuid: string, title: string, authorUuids: string[]): Observable<any> {
    const songData = {title: title, authorUuids: authorUuids};
    console.log(songData);
    return this.http.put(environment.apiURL + '/api/songs/' + uuid, songData, {observe: 'response'});
  }

  updateSongFile(uuid: string, file: File): Observable<any> {
    let request = new FormData();
    request.append('songFile', file);
    return this.http.put(environment.apiURL + '/api/songs/' + uuid + '/file', request, {observe: 'response'});
  }

  deleteSong(uuid: string): Observable<any> {
    return this.http.delete(environment.apiURL + '/api/songs/' + uuid, {observe: 'response'});
  }

}
