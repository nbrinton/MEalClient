import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../models/mock/recipe';
import {ToastrService} from 'ngx-toastr';
import {GenerateMealsService} from '../../services/generate-meals.service';

@Component({
  selector: 'app-plan-meal',
  templateUrl: './plan-meal.component.html',
  styleUrls: ['./plan-meal.component.scss']
})
export class PlanMealComponent implements OnInit {

  @Input() name: string = 'MEAL NAME';
  @Input() recipes: Recipe[] = [];

  @Input() disableToggle: boolean = false;
  @Input() allowDuplicateRecipes: boolean = true;

  @Output() toggleAllowDuplicateRecipesEvent = new EventEmitter<boolean>();
  @Output() generateRecipesEvent = new EventEmitter<boolean>();
  @Output() deleteAllRecipesEvent = new EventEmitter<boolean>();
  @Output() deleteRecipeEvent = new EventEmitter<number>();
  @Output() replaceRecipeEvent = new EventEmitter<number>();
  @Output() addRecipeEvent = new EventEmitter<boolean>();

  constructor(
    private toastr: ToastrService,
    private gms: GenerateMealsService
  ) {
  }

  ngOnInit(): void {
  }

  copyIngredientsToClipboard() {
    let ingredientsString: string = this.gms.copyIngredientsToClipboard(this.recipes);
    navigator.clipboard.writeText(ingredientsString);
    this.toastr.success('Copied ingredients to clipboard!', undefined, { closeButton: true, timeOut: 1500 });
  }

  generate() {
    this.generateRecipesEvent.emit(true);
  }

  deleteAll() {
    this.deleteAllRecipesEvent.emit(true);
  }

  delete(index: number) {
    this.deleteRecipeEvent.emit(index);
  }

  replace(index: number) {
    this.replaceRecipeEvent.emit(index);
  }

  add() {
    this.addRecipeEvent.emit(true);
  }

  toggleAllowDuplicateRecipes() {
    this.allowDuplicateRecipes = !this.allowDuplicateRecipes;
    this.toggleAllowDuplicateRecipesEvent.emit(this.allowDuplicateRecipes);
  }

}
