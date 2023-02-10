import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})

export class SettingsDialogComponent {
  constructor(private dialogRef: MatDialog) {};

  settingsForm = new FormGroup({
    acceptableWaitTime: new FormControl(''),
  });

  openSettingsModal() {
    this.dialogRef.open(SettingsDialogComponent);
  };
}
