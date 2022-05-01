import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/interfaces/recipe';

@Component({
  selector: 'app-recipe-meal',
  templateUrl: './recipe-meal.component.html',
  styleUrls: ['./recipe-meal.component.scss']
})
export class RecipeMealComponent implements OnInit {
  @Input() name: string = 'MEAL NAME';
  @Input() recipes: Recipe[] = [];

  constructor() { }

  ngOnInit(): void { }

}
