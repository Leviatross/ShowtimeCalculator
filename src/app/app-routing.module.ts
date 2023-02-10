import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieDialogComponent } from './add-movie-dialog/add-movie-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

const routes: Routes = [
  { path: 'add-movie-component', component: AddMovieDialogComponent},
  { path: 'settings-dialog-component', component: SettingsDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { };
