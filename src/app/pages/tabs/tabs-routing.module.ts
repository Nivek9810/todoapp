import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { HomePage } from 'src/app/home/home.page';
import { SubjectsPage } from '../subjects/subjects.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'subjects',
        outlet: 'subjects',
        component: SubjectsPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ], 
  exports: [RouterModule]
})
export class TabsRoutingModule { }
