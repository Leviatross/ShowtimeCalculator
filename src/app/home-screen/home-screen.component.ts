import { Component, Directive, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../movie';
import { MatDialog } from '@angular/material/dialog';
import { AddShowingsComponent } from '../add-showings/add-showings.component';
import { AddMovieComponent } from '../add-movie/add-movie.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})

export class HomeScreenComponent implements OnInit {
  movies = <Movie[]>[];
  constructor(private apiService: ApiService, private dialogRef: MatDialog) { } 

  addShowings() {
    this.dialogRef.open(AddShowingsComponent);
  }

  addMovie() {
    this.dialogRef.open(AddMovieComponent);
  }

  ngOnInit() {
    this.apiService.getMovies().subscribe((data)=>{
      this.movies = <Movie[]>JSON.parse(JSON.stringify(data));
      this.movies.forEach(function (movie)
      {
        movie.hours = Math.floor(movie.runtime / 60)
        movie.minutes = movie.runtime % 60
      })
    });
  }
}