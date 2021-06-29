import * as fromShoppingList from '../shopping-list/shopping-list-store/shopping-list.reducer';
import * as fromAuth from '../auth/auth-store/auth.reducer';
import * as fromRecipe from '../recipes/recipes-store/recipe.reducer';
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipe.recipeReducer
};
