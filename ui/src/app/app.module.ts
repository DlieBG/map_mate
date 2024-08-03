import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
