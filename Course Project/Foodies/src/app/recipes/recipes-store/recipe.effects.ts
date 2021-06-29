import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe.model";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import * as RecipeActions from "./recipe.actions";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  fireRecipeUrl
    = 'https://angular-guide-84051-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipes = createEffect(() =>{
    return this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          this.fireRecipeUrl
        )
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients?recipe.ingredients:[]
          }
        })
      }),
      map(recipes => {
        return new RecipeActions.SetRecipes(recipes);
      })
    )
  })

  storeRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipeState])=> {
        return this.http.put(
          this.fireRecipeUrl,
          recipeState.recipes
        )
      })
    )
  }, {dispatch: false});
}
