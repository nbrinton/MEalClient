import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlanComponent } from './plan/plan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeMealComponent } from './recipes/recipe-meal/recipe-meal.component';
import { PlanMealComponent } from './plan/plan-meal/plan-meal.component';
import { ViewRecipesComponent } from './recipes/view-recipes/view-recipes.component';
import { ViewRecipeComponent } from './recipes/view-recipe/view-recipe.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanComponent,
    PageNotFoundComponent,
    HeaderComponent,
    RecipesComponent,
    AddRecipeComponent,
    RecipeMealComponent,
    PlanMealComponent,
    ViewRecipesComponent,
    ViewRecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
