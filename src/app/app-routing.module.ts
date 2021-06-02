import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

const routes: Routes = [
  { path: 'generation/:number', component: PokemonTableComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
  { path: '**', redirectTo: 'generation/1'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
