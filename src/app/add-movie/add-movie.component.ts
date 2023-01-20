import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movieForm = new FormGroup({
    title: new FormControl(''),
    hours: new FormControl(''),
    minutes: new FormControl(''),
  })

  data = { }
  
  constructor(private httpClient: HttpClient) {}

  saveMovie() {
    console.log("Save movie has been called");
    let movie = this.movieForm.value;

    if(movie.hours === null || movie.hours === undefined)
    {
      movie.hours = "0";
    }
    if(movie.minutes === null || movie.minutes === undefined)
    {
      movie.minutes = "0";
    }
    let hours = parseInt(movie.hours);
    let minutes = parseInt(movie.minutes);
    const runtime = (hours * 60) + minutes;

    const data = {"title": movie.title, "runtime": runtime};
    this.movieForm.reset();
    return this.httpClient.post('http://localhost:3000/movie', data).subscribe((res) => {console.log(res)});
  }
}