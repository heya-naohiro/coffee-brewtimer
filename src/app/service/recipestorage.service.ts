import { Injectable } from '@angular/core';

const RECIPE_STORAGE_KEY = 'recipe_storage_key'

export interface Recipe {
  name: string;
  alarm: Array<number>;
  active: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class RecipeStorageService {
  DEFAULT_RECIPES: Array<Recipe> =
  [
   {name: "default", alarm: [300, 600, 900, 1200], active: true} 
  ]
  constructor() { }

  fetch(): Recipe[]  {
    const str = localStorage.getItem(RECIPE_STORAGE_KEY)
    if (str) {
      return JSON.parse(str)
    }

    return this.DEFAULT_RECIPES
  }
  clear(): void {
    localStorage.removeItem(RECIPE_STORAGE_KEY);
  }

  save(recipes: Recipe[]) {
    localStorage.setItem(RECIPE_STORAGE_KEY, JSON.stringify(recipes));
  }
}
