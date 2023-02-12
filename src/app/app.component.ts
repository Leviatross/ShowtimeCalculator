import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private apiService: ApiService, private dialog: MatDialog) { };

  openAddShowings(movieData: Movie) {
    this.dialog.open(AddShowingsComponent, {
      width: '30em',
      data: movieData
    })
  };

  openAddMovieDialog() {
    const dialogRef = this.dialog.open(AddMovieDialogComponent, {
      width: '40em'
    })

    dialogRef.componentInstance.movieAdded.subscribe((newMovie) =>
      {
        this.movies.push(newMovie)
      }
    )
  };

  getFormattedRuntime(movieToFormat: Movie) {
    let hours = Math.floor(movieToFormat.runtimeMinutes / 60);
    let minutes = movieToFormat.runtimeMinutes % 60;
    let formattedRuntime = hours + ":" + minutes;
    return formattedRuntime;
  };

  openSettingsDialog() {
    this.dialog.open(SettingsDialogComponent);
  };

  public ngOnInit() {
    this.apiService.getMovies().subscribe((data)=>{
      this.movies = <Movie[]>JSON.parse(JSON.stringify(data))
    });
  }
}