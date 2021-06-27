import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module')
      .then(mod=>mod.RecipesModule)},
  // {path: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
