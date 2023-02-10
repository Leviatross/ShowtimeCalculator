import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api.service';
import { Movie } from '../movie';
import { Showing } from '../showing';

@Component({
  selector: 'app-add-showings-dialog',
  templateUrl: './add-showings-dialog.component.html',
  styleUrls: ['./add-showings-dialog.component.css']
})

export class AddShowingsComponent {
  public showings: Showing[] = [];

  showingForm = new FormGroup({
    hours: new FormControl(''),
    minutes: new FormControl(''),
  });

  data = { };

  constructor(private httpClient: HttpClient, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public movieData: Movie) {}

  async saveShowing() {
    console.log("Save showing has been called");
    let showing = this.showingForm.value;
    if(!showing.hours) {
      showing.hours = "0";
    }
    if(!showing.minutes) {
      showing.minutes = "00";
    }
    //Not working currently
    if(showing.minutes.length == 1) {
      showing.minutes = "0" + showing.minutes;
    }
    let time = showing.hours + ":" + showing.minutes;

    const data = {time};
    const response = await firstValueFrom(this.httpClient.post<Showing>('http://localhost:3000/movie/' + this.movieData.id + '/showing', data));
    this.showings.push(response);
    this.showingForm.reset();
    return response;
  }

  async deleteShowing(id: number) {
    console.log("Delete showing called");
    const deletedShowing = await firstValueFrom(this.httpClient.delete<Showing>('http://localhost:3000/showing/' + id));
    this.showings.forEach((showing) => {
      if(showing.id === deletedShowing.id) {
        //Feel like getting the index of the current showing could be more streamlined
        //Should only be one showing so once found would be more efficient to exit the forEach afterward
        this.showings.splice(this.showings.indexOf(showing), 1);
      }
    });
    return deletedShowing;
  }

  formatShowing(time: string)
  {
    let splitTime = time.split(':');
    let hour = parseInt(splitTime[0]);
    if(hour <= 12){
      time = time + "AM";
    }
    else {
      time = hour - 12 + ":" + splitTime[1] + "PM";
    }
    return time;
  }

  ngOnInit() {
    this.apiService.getShowings(this.movieData.id).subscribe((data)=>{
      this.showings = <Showing[]>JSON.parse(JSON.stringify(data));
    });
  }
}
