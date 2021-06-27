import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "./recipe.service";

import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  fireRecipeUrl: string = 'https://angular-guide-84051-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        this.fireRecipeUrl,
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(): any {
    return this.http.get<Recipe[]>(
      this.fireRecipeUrl
    )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients?recipe.ingredients:[]
            }
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
