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
    time: new FormControl(''),
    hours: new FormControl(''),
    minutes: new FormControl(''),
  });

  data = { };

  constructor(private httpClient: HttpClient, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public movieData: Movie) {}

  async saveShowing() {
    let showing = this.showingForm.value;
    let time = showing.time;

    if(time) {
      // I feel like this is a bit lengthy to do (Remove the AM/PM, add 12 to the hours if it's PM), but it seemed to take quite a few transformations
      let timeAndMeridian = time.split(" ");
      let timeOnly = timeAndMeridian[0];
      let meridian = timeAndMeridian[1];
      let hoursAndMinutes = timeOnly.split(":");
      let hours = parseInt(hoursAndMinutes[0]);
      let minutes = parseInt(hoursAndMinutes[1]);
      if(meridian === "PM") {
        hours += 12;
      }
      let formattedTime = hours + ":" + minutes;
      time = formattedTime;

    const data = {time};
    const response = await firstValueFrom(this.httpClient.post<Showing>('http://localhost:3000/movie/' + this.movieData.id + '/showing', data));
    this.showings.push(response);
    this.showings = this.sortShowings(this.showings);
    this.showingForm.reset();
    return response;
  }

      //POC - Math with time
    /*if(time) {
      let splitTime = time.split(':');
      let hours = parseInt(splitTime[0]);
      let minutes = parseInt(splitTime[1]);
      let testDate = new Date;
      testDate.setSeconds(0);
      console.log("Initial date: ", testDate);
      testDate.setHours(hours);
      testDate.setMinutes(minutes);
      console.log("Updated date: ", testDate);
      let laterTestDate = testDate;
      laterTestDate.setHours(testDate.getHours() + 1);
      laterTestDate.setMinutes(testDate.getMinutes() + 47);
      console.log("Later test date: ", laterTestDate);
    }*/

  return "Error: Time is null or undefined";
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
    if(hour == 0)
    {
      time = 12 + ":" + splitTime[1] + "AM";
    }
    else if(hour <= 11){
      //If the first character is a 0, remove it
      if(time[0] === '0'){
        time = time.substring(1);
      }
      time = time + "AM";
    }
    else if(hour == 12)
    {
      time = time + "PM";
    }
    else {
      time = hour - 12 + ":" + splitTime[1] + "PM";
    }
    return time;
  }

  sortShowings(showingsToSort: Showing[]){
    showingsToSort.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
    return showingsToSort;
  }

  ngOnInit() {
    this.apiService.getShowings(this.movieData.id).subscribe((data: Showing[])=>{
      this.showings = this.sortShowings(data);
    });
  }
}
