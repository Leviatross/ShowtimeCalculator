import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Movie } from '../movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent {
  @Output() movieAdded = new EventEmitter<Movie>()

  movieForm = new FormGroup({
    title: new FormControl(''),
    hours: new FormControl('',
      Validators.pattern("^[0-9]*$")
    ),
    minutes: new FormControl('',
    Validators.pattern("^[0-9]*$"),
    ),
  })

  data = { }
  
  constructor(private httpClient: HttpClient) {}

  async saveMovie() {
    console.log("Save movie has been called");
    let movie = this.movieForm.value;

    if(!movie.hours)
    {
      movie.hours = "0";
    }
    if(!movie.minutes)
    {
      movie.minutes = "0";
    }
    let hours = parseInt(movie.hours);
    let minutes = parseInt(movie.minutes);
    const runtimeMinutes = (hours * 60) + minutes;

    const data = {title: movie.title, runtimeMinutes};
    const response = await firstValueFrom(this.httpClient.post<Movie>('http://localhost:3000/movie', data));
    this.movieAdded.emit(response);
    this.movieForm.reset();
    return response;
  }
}