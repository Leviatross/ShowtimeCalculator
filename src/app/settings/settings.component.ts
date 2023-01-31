import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent {
  constructor(private dialogRef: MatDialog) {};

  settingsForm = new FormGroup({
    acceptableWaitTime: new FormControl(''),
  });

  openSettingsModal() {
    this.dialogRef.open(SettingsComponent);
  }
}
