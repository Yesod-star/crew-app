import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Character } from './Character';
import { RaceEnum } from './Enum/RaceEnum';
import { classRpg } from './classRpg';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  url = 'http://localhost:5249/api/character';
  constructor(private http: HttpClient) {}
    ListAll(): Observable<Character[]>{
      return this.http.get<Character[]>(this.url)
    }
  
    GetById(characterId: number): Observable<Character>{
      const apiUrl = `${this.url}/${characterId}`;
      return this.http.get<Character>(apiUrl);
    }

    SaveCharacter(character: Character): Observable<any>{
      return this.http.post<Character>(this.url, character, httpOptions);
    }

    UpdateCharacter(character: Character): Observable<any>{
      return this.http.put<Character>(this.url, character, httpOptions);
    }

    RemoveCharacter(CharacterId : number) : Observable<any>{
      const apiUrl = `${this.url}/${CharacterId}`;
      return this.http.delete<number>(apiUrl,httpOptions);
    }

    getClassNames(): Observable<string[]> {
      return this.http.get<classRpg[]>(this.url).pipe(
        map(characters => Array.from(new Set(characters.map(character => character.classRpgId.toString()))))
      );
    }
  
    getRaceOptions(): Observable<string[]> {
      const raceOptions: string[] = Object.values(RaceEnum)
        .filter(value => typeof value === 'string')
        .map(value => String(value));
      return of(raceOptions);
    }
}
