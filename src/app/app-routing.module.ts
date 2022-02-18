import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipesComponent } from './recipes/recipes.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'plan',
    pathMatch: 'full'
  },
  {
    path: 'plan',
    component: PlanComponent,
    data: {
      name: 'Plan',
      icon: 'fas fa-house'
    }
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    data: {
      name: 'Recipes',
      icon: 'fas fa-edit'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
