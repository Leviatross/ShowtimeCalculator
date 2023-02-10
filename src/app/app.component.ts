import { Component, Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddShowingsComponent } from './add-showings/add-showings.component';
import { ApiService } from './api.service';
import { Movie } from './movie';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Output() movieAdded = new EventEmitter<Movie>
  movies = <Movie[]>[];
  constructor(private apiService: ApiService, private dialog: MatDialog) { } 

  openAddShowings(movieData: Movie) {
    this.dialog.open(AddShowingsComponent, {
      width: '30em',
      data: movieData
    });
  }

  openAddMovie() {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '40em'
    });

    dialogRef.componentInstance.movieAdded.subscribe((newMovie) =>
      {
        this.formatRuntime(newMovie)
        this.movies.push(newMovie)
      }
    )
  }

  openSettings() {
    this.dialog.open(SettingsComponent);
  }

  public formatRuntime(movieToFormat: Movie){
    movieToFormat.hours = Math.floor(movieToFormat.runtimeMinutes / 60)
    movieToFormat.minutes = movieToFormat.runtimeMinutes % 60
    return movieToFormat;
  }

  public ngOnInit() {
    this.apiService.getMovies().subscribe((data)=>{
      this.movies = <Movie[]>JSON.parse(JSON.stringify(data));
      this.movies.forEach((movie) => this.formatRuntime(movie));
    });
  }
}