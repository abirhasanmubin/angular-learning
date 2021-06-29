import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const ADD_RECIPE = '[Recipes] Add Recipe';
export const SET_RECIPES = '[Recipes] Set Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';

export class AddRecipe implements Action{
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class SetRecipes implements Action{
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class UpdateRecipe implements Action{
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {index: number, recipe: Recipe}) {}
}

export class DeleteRecipe implements Action{
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export type RecipeActions =
  | AddRecipe
  | SetRecipes
  | UpdateRecipe
  | DeleteRecipe;