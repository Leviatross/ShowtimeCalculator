import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-showings',
  templateUrl: './add-showings.component.html',
  styleUrls: ['./add-showings.component.css']
})

export class AddShowingsComponent {
  showingForm = new FormGroup({
    hours: new FormControl(''),
    minutes: new FormControl(''),
  });
}
