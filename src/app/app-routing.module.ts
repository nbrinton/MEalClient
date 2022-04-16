import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { ViewRecipesComponent } from './recipes/view-recipes/view-recipes.component';
import { ViewRecipeComponent } from './recipes/view-recipe/view-recipe.component';

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
      icon: 'fas fa-house fa-lg',
      nav: true
    }
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    data: {
      name: 'Recipes',
      icon: 'fas fa-edit fa-lg',
      nav: true
    },
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'view',
        component: ViewRecipesComponent
      },
      {
        path: 'view/:id',
        component: ViewRecipeComponent
      },
      {
        path: 'add',
        component: AddRecipeComponent
      }
    ]
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
export class AppRoutingModule {
}
