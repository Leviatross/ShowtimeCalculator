import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMovieDialogComponent } from './add-movie-dialog/add-movie-dialog.component';
import { AddShowingsComponent } from './add-showings-dialog/add-showings-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    AddMovieDialogComponent,
    AddShowingsComponent,
    SettingsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    NgxMaterialTimepickerModule,
    MatTooltipModule,
  ],
  exports: [MatButtonModule, MatIconButton, MatIconModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddShowingsComponent]
})
export class AppModule { }
