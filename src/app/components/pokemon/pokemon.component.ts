import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public pokemonObj;

  public pokemonLoaded:boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private cacheService: CacheService,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {

    this.activatedRoute.url.subscribe( async (url)=>{
      const pokemonId = parseInt(url[1].path);
      this.feedbackService.openSnackBar("Loading pokemon", true, 0) 

      let pokemon;
      try {
        pokemon = await this.cacheService.getPokemon(pokemonId);
      } catch (error) { console.log(error) }
      if(!pokemon) { // if generation==false does not exist in cache so fall back to  call to the api
        try {
          pokemon = await this.apiService.getPokemon(pokemonId).toPromise()
        } catch (error) { 
          this.pokemonLoaded = true;
          return this.feedbackService.openSnackBar("Failed to load pokemon", false, 3500) 
        }
        this.cacheService.setPokemon(pokemonId, pokemon) // cache the generation obj
      } 

      this.pokemonObj = pokemon;
      this.pokemonLoaded = true;
      return this.feedbackService.openSnackBar("Pokemon loaded", false, 3500) 
    })
    
  }

}
