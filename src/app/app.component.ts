import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AddMovieDialogComponent } from './add-movie-dialog/add-movie-dialog.component';
import { AddShowingsComponent } from './add-showings-dialog/add-showings-dialog.component';
import { ApiService } from './api.service';
import { Movie } from './movie';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Output() movieAdded = new EventEmitter<Movie>;
  movies: Movie[] = [];


  selectedMovies: Movie[] = [];
  time = {hours: 12, minutes: 0};
  constructor(private apiService: ApiService, private dialog: MatDialog) { };

  selectMovie(selectedMovie: Movie) {
    this.selectedMovies.push(selectedMovie);
    this.movies = this.movies.filter(m => m.id !== selectedMovie.id)
  }

  deselectMovie(movie: Movie) {
    this.movies.push(movie);
    this.movies = this.sortMovies(this.movies);
    this.selectedMovies = this.selectedMovies.filter(m => m.id !== movie.id);
  }

  openAddShowings(movieData: Movie) {
    this.dialog.open(AddShowingsComponent, {
      width: '30em',
      height: '20.8em',
      data: movieData
    })
  };

  openAddMovieDialog() {
    const dialogRef = this.dialog.open(AddMovieDialogComponent, {
      width: '40em',
    })

    dialogRef.componentInstance.movieAdded.subscribe((newMovie) =>
      {
        this.movies.push(newMovie);
        this.movies = this.sortMovies(this.movies);
      }
    )
  };

  getFormattedRuntime(movieToFormat: Movie) {
    let hours = Math.floor(movieToFormat.runtimeMinutes / 60);
    let minutes = movieToFormat.runtimeMinutes % 60;
    let minutesString = minutes.toString();
    if(minutesString.length < 2) {
      minutesString = '0' + minutes;
    }
    let formattedRuntime = hours + ":" + minutesString;
    return formattedRuntime;
  };

  sortMovies(moviesToSort: Movie[]){
    moviesToSort.sort((a, b) => a.dateAdded > b.dateAdded ? -1 : a.dateAdded < b.dateAdded ? 1 : 0);
    return moviesToSort;
  }

  openSettingsDialog() {
    this.dialog.open(SettingsDialogComponent, {
      width: '30em'
    })
  };

  public ngOnInit() {
    this.apiService.getMovies().subscribe((data)=>{
      this.movies = this.sortMovies(<Movie[]>data);
      let moviesO = new Subject<Movie[]>();
    });
  }
}