import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: '../../home/home.module#HomePageModule'
      },
      {
        path: 'subjects',
        loadChildren: '../../pages/subjects/subjects.module#SubjectsPageModule'
      },
      {
        path: 'home/details/:id',
        loadChildren: '../../pages/todo-details/todo-details.module#TodoDetailsPageModule'
      },
      {
        path: 'home/details',
        loadChildren: '../../pages/todo-details/todo-details.module#TodoDetailsPageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: '/tabs',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
