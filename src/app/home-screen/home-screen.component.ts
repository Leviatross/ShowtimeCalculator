import { Component, Directive, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../movie';
import { MatDialog } from '@angular/material/dialog';
import { AddShowingsComponent } from '../add-showings/add-showings.component';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})

export class HomeScreenComponent implements OnInit {
  movies = <Movie[]>[];
  constructor(private apiService: ApiService, private dialogRef: MatDialog) { } 

  openAddShowings(movieData: Movie) {
    this.dialogRef.open(AddShowingsComponent, {
      data: movieData
    });
  }

  openAddMovie() {
    this.dialogRef.open(AddMovieComponent);
  }

  openSettings() {
    this.dialogRef.open(SettingsComponent);
  }

  public ngOnInit() {
    this.apiService.getMovies().subscribe((data)=>{
      this.movies = <Movie[]>JSON.parse(JSON.stringify(data));
      this.movies.forEach(function (movie)
      {
        movie.hours = Math.floor(movie.runtimeMinutes / 60)
        movie.minutes = movie.runtimeMinutes % 60
      })
    });
  }
}