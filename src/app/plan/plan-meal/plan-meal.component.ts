import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Recipe } from '../../models/recipe';
import {add, replace} from "lodash";
import {generate} from "rxjs";

@Component({
  selector: 'app-plan-meal',
  templateUrl: './plan-meal.component.html',
  styleUrls: ['./plan-meal.component.scss']
})
export class PlanMealComponent implements OnInit {

  @Input() name: string = 'MEAL NAME';
  @Input() recipes: Recipe[] = [];

  @Output() generateRecipesEvent = new EventEmitter<boolean>();
  @Output() deleteAllRecipesEvent = new EventEmitter<boolean>();
  @Output() deleteRecipeEvent = new EventEmitter<number>();
  @Output() replaceRecipeEvent = new EventEmitter<number>();
  @Output() addRecipeEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

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

}
