import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { HomeScreenComponent } from './home-screen/home-screen.component'

const routes: Routes = [
  { path: '', component: HomeScreenComponent,},
  { path: 'home-screen-component', component: HomeScreenComponent},
  { path: 'add-movie-component', component: AddMovieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
