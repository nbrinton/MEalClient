import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Recipe } from '../../models/interfaces/recipe';
import { GenerateMealPlanService } from '../../services/generate-meal-plan/generate-meal-plan.service';

@Component({
  selector: 'app-plan-meal',
  templateUrl: './plan-meal.component.html',
  styleUrls: ['./plan-meal.component.scss']
})
export class PlanMealComponent implements OnInit {

  @Input() name: string = 'MEAL NAME';
  @Input() recipes: Recipe[] = [];

  @Input() disableToggle: boolean = false;
  @Input() allowDuplicates: boolean = true;

  @Output() toggleAllowDuplicateRecipesEvent = new EventEmitter<boolean>();
  @Output() generateRecipesEvent = new EventEmitter<boolean>();
  @Output() deleteAllRecipesEvent = new EventEmitter<boolean>();
  @Output() deleteRecipeEvent = new EventEmitter<number>();
  @Output() replaceRecipeEvent = new EventEmitter<number>();
  @Output() addRecipeEvent = new EventEmitter<boolean>();

  constructor(
    private toastr: ToastrService,
    private gmp: GenerateMealPlanService
  ) {
  }

  ngOnInit(): void {
  }

  copyIngredientsToClipboard() {
    let ingredientsString: string = this.gmp.copyIngredientsToClipboard(this.recipes);
    navigator.clipboard.writeText(ingredientsString);
    this.toastr.success('Copied ingredients to clipboard!', undefined, {closeButton: true, timeOut: 1500});
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
    this.allowDuplicates = !this.allowDuplicates;
    this.toggleAllowDuplicateRecipesEvent.emit(this.allowDuplicates);
  }

}
