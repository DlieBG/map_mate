import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { ProjectForumComponent } from './components/project-forum/project-forum.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectMapComponent } from './components/project-map/project-map.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectStreetviewComponent } from './components/project-streetview/project-streetview.component';
import { ProjectMap3dComponent } from './components/project-map3d/project-map3d.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { PointMarkerGroupCreateComponent } from './components/point-marker-group-create/point-marker-group-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectSettingsComponent,
    ProjectForumComponent,
    ProjectComponent,
    ProjectMapComponent,
    ProjectCreateComponent,
    ProjectStreetviewComponent,
    ProjectMap3dComponent,
    ProjectEditComponent,
    PointMarkerGroupCreateComponent,
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
    MatExpansionModule,
    MatProgressBarModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
