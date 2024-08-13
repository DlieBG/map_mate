import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GoogleMapsModule } from "@angular/google-maps";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { ProjectForumComponent } from './components/project-forum/project-forum.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectMapComponent } from './components/project-map/project-map.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectSettingsComponent,
    ProjectForumComponent,
    ProjectComponent,
    ProjectMapComponent,
    ProjectCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
