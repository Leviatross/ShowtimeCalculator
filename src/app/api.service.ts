import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Showing } from './showing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {};

  public getMovies(){
    return this.httpClient.get('http://localhost:3000/movie');
  }

  public getShowings(movieId: number): Observable<Showing[]> {
    let showings = this.httpClient.get<Showing[]>('http://localhost:3000/movie/' + movieId + '/showing');
    return showings;
  }
}
