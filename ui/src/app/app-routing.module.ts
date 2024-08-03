import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectForumComponent } from './components/project-forum/project-forum.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectListComponent,
    },
    {
        path: ':id',
        component: ProjectComponent,
    },
    {
        path: ':id/forum',
        component: ProjectForumComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
