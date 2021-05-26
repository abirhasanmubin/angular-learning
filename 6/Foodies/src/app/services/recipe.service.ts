import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      "Jhal Fry",
      "Shei taste. Shei Jhal.",
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872",
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Chilli', 5)
      ]
    ),
    new Recipe(
      "Beef Shatkora",
      "Sylheter shera shad.",
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872",
      [
        new Ingredient('Beef', 1),
        new Ingredient('Shatkora', 1 / 2)
      ]
    ),
  ];
  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

}
