import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  recipeNamePlaceholder: string = '';
  time = {hour: 13, minute: 30};

  recipeNamePlaceholderValues: string[] = [
    'Best Spaghetti Ever',
    'Delicious Brownies',
    'Kevin\'s World-famous Chili'
  ];

  units: string[] = [
    'tsp',
    'tbsp',
    'lb',
    'pkg',
    'oz',
    'cup',
    'qt',
    'pt'
  ];

  sections: string[] = [
    'Produce',
    'Hispanic',
    'Asian',
    'Canned Goods',
    'Snacks',
    'Pasta',
    'Bulk',
    'Deli',
    'Meats',
    'Freezer',
    'Dairy',
    'Baking',
    'Bakery'
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.units.sort();
    this.sections.sort();

    let index = Math.floor(Math.random() * (this.recipeNamePlaceholderValues.length - 1));
    this.recipeNamePlaceholder = this.recipeNamePlaceholderValues[index];
  }

}
