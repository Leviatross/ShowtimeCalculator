import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {};

  public getMovies(){
    return this.httpClient.get('http://localhost:3000/movie');
  }

  public getShowings(movieId: number){
    return this.httpClient.get('http://localhost:3000/movie/' + movieId + '/showing');
  }
}
