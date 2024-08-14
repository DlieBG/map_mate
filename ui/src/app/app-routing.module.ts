import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectForumComponent } from './components/project-forum/project-forum.component';
import { ProjectStreetviewComponent } from './components/project-streetview/project-streetview.component';
import { ProjectMap3dComponent } from './components/project-map3d/project-map3d.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectListComponent,
    },
    {
        path: 'streetview',
        component: ProjectStreetviewComponent,
    },
    {
        path: '3d',
        component: ProjectMap3dComponent,
    },
    {
        path: ':id/forum',
        component: ProjectForumComponent,
    },
    {
        path: ':id',
        component: ProjectComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
