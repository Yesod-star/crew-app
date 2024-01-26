import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { classRpg } from './classRpg';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class classRpgsService {
  url = 'http://localhost:5249/api/classrpg';
  constructor(private http: HttpClient) {}
    ListAll(): Observable<classRpg[]>{
      return this.http.get<classRpg[]>(this.url)
    }
  
    GetById(ClassRpgId: number): Observable<classRpg>{
      const apiUrl = `${this.url}/${ClassRpgId}`;
      return this.http.get<classRpg>(apiUrl);
    }

    SaveClassRpg(classRpg: classRpg): Observable<any>{
      return this.http.post<classRpg>(this.url, classRpg, httpOptions);
    }

    UpdateClassRpg(classRpg: classRpg): Observable<any>{
      return this.http.put<classRpg>(this.url, classRpg, httpOptions);
    }

    RemoveClassRpg(ClassRpgId : number) : Observable<any>{
      const apiUrl = `${this.url}/${ClassRpgId}`;
      return this.http.delete<number>(apiUrl,httpOptions);
    }
}
