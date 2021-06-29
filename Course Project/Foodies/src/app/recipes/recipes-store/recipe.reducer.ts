import * as RecipeActions from './recipe.actions';
import {Recipe} from "../recipe.model";

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: []
}

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }
    case RecipeActions.UPDATE_RECIPE:
      let updatedRecipe = {...state.recipes[action.payload.index]};
      updatedRecipe = {
        ...updatedRecipe,
        ...action.payload.recipe
      }
      const updatedRecipes = [
        ...state.recipes
      ]
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      }
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => index !== action.payload)
      }
    default:
      return {
        ...state
      }
  }
}
