import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'add-movie-component', component: AddMovieComponent},
  { path: 'settings-component', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
