import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HomeScreenComponent } from '../home-screen/home-screen.component';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent {
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

  saveMovie() {
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

    const data = {"title": movie.title, "runtimeMinutes": runtimeMinutes};
    this.movieForm.reset();
    const response = firstValueFrom(this.httpClient.post('http://localhost:3000/movie', data));
    return response;
  }
}