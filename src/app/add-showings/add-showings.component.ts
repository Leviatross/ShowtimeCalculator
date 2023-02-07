import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api.service';
import { Movie } from '../movie';
import { Showing } from '../showing';

@Component({
  selector: 'app-add-showings',
  templateUrl: './add-showings.component.html',
  styleUrls: ['./add-showings.component.css']
})

export class AddShowingsComponent {
  showings = <Showing[]>[];

  showingForm = new FormGroup({
    hours: new FormControl(''),
    minutes: new FormControl(''),
  });

  data = { };

  constructor(private httpClient: HttpClient, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public movieData: Movie) {}

  saveShowing() {
    console.log("Save showing has been called");
    let showing = this.showingForm.value;
    if(!showing.hours)
    {
      showing.hours = "0";
    }
    if(!showing.minutes)
    {
      showing.minutes = "0";
    }
    let time = showing.hours + ":" + showing.minutes;

    const data = {"time": time};
    this.showingForm.reset();
    this.httpClient.post('http://localhost:3000/movie/' + this.movieData.id + '/showing', data);
    const response = firstValueFrom(this.httpClient.post('http://localhost:3000/movie/' + this.movieData.id + '/showing', data));
    this.ngOnInit();
    return response;
  }

  deleteShowing(id: number) {
    console.log("Delete showing called");
    const response = firstValueFrom(this.httpClient.delete('http://localhost:3000/showing/' + id));
    this.ngOnInit();
    return response;
  }

  ngOnInit() {
    this.apiService.getShowings(this.movieData.id).subscribe((data)=>{
      this.showings = <Showing[]>JSON.parse(JSON.stringify(data));
      this.showings.forEach(function (showing)
      {
        let splitTime = showing.time.split(':');
        let hour = parseInt(splitTime[0]);
        if(hour <= 12)
        {
          showing.time = showing.time + "AM";
        }
        else
        {
          showing.time = hour - 12 + ":" + splitTime[1] + "PM";
        }
      })
    });
  }
}
