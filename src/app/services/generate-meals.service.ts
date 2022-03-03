import { Injectable } from '@angular/core';
import breakfasts from './mock-data/breakfasts.json';
import lunches from './mock-data/lunches.json';
import dinners from './mock-data/dinners.json';
import { Recipe } from "../models/recipe";

@Injectable({
  providedIn: 'root'
})
export class GenerateMealsService {

  constructor() { }

  getAllBreakfasts(): Recipe[] {
    return breakfasts;
  }

  getAllLunches(): Recipe[] {
    return lunches;
  }

  getAllDinners(): Recipe[] {
    return dinners;
  }

  generateBreakfasts(): Recipe[] {
    let chosenBreakfasts = [];
    for (let i = 0; i < 7; i++) {
      chosenBreakfasts.push(this.getRandomEntry(breakfasts));
    }

    return chosenBreakfasts;
  }

  generateLunches(): Recipe[] {
    let chosenLunches = [];
    for (let i = 0; i < 7; i++) {
      chosenLunches.push(this.getRandomEntry(lunches));
    }

    return chosenLunches;
  }

  generateDinners(): Recipe[] {
    let chosenDinners = [];
    for (let i = 0; i < 7; i++) {
      chosenDinners.push(this.getRandomEntry(dinners));
    }

    return chosenDinners;
  }

  getRandomBreakfast(): Recipe {
    return this.getRandomEntry(breakfasts);
  }

  getRandomLunch(): Recipe {
    return this.getRandomEntry(lunches);
  }

  getRandomDinner(): Recipe {
    return this.getRandomEntry(dinners);
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getRandomEntry(list: any[]): any {
    return list[this.getRandomInt(list.length)];
  }
}
