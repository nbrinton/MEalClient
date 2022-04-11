import {Injectable} from '@angular/core';
import breakfasts from './mock-data/breakfasts.json';
import lunches from './mock-data/lunches.json';
import dinners from './mock-data/dinners.json';
import {Recipe} from '../models/recipe';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GenerateMealsService {

  constructor() {
  }

  getAllBreakfasts(): Recipe[] {
    return breakfasts;
  }

  getNumBreakfasts(): number {
    return breakfasts.length;
  }

  getNumLunches(): number {
    return lunches.length;
  }

  getNumDinners(): number {
    return dinners.length;
  }

  getAllLunches(): Recipe[] {
    return lunches;
  }

  getAllDinners(): Recipe[] {
    return dinners;
  }

  generateBreakfasts(allowDuplicates: boolean = true): Recipe[] {
    let chosenBreakfasts: any = [];
    for (let i = 0; i < 7; i++) {
      let breakfast = this.getRandomEntry(breakfasts);

      while (!allowDuplicates && chosenBreakfasts.includes(breakfast)) {
        breakfast = this.getRandomEntry(breakfasts);
      }
      chosenBreakfasts.push(breakfast);
    }

    return chosenBreakfasts;
  }

  generateLunches(allowDuplicates: boolean = true): Recipe[] {
    let chosenLunches: any = [];
    for (let i = 0; i < 7; i++) {
      let lunch = this.getRandomEntry(lunches);

      while (!allowDuplicates && chosenLunches.includes(lunch)) {
        lunch = this.getRandomEntry(lunches);
      }
      chosenLunches.push(lunch);
    }

    return chosenLunches;
  }

  generateDinners(allowDuplicates: boolean = false): Recipe[] {
    let chosenDinners: any = [];
    for (let i = 0; i < 7; i++) {
      let dinner = this.getRandomEntry(dinners);

      while (!allowDuplicates && _.includes(chosenDinners, dinner)) {
        dinner = this.getRandomEntry(dinners);
      }
      chosenDinners.push(dinner);
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
