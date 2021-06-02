import { Injectable } from '@angular/core';
import { get, set } from 'idb-keyval';


@Injectable({
  providedIn: 'root'
})

// service uses indexeddb key value npm package to use url as key to cache responses from the api
export class CacheService {

  constructor() { }

  private baseUrl: string = "https://pokeapi.co/api/v2/";

  public getPokemon(id){
    return get(this.baseUrl+"pokemon/"+id);
  }

  public setPokemon(id, pokemonObj){
    return set(this.baseUrl+"pokemon/"+id, pokemonObj);
  }

  public getGeneration(genNo){
    return get(this.baseUrl+"generation/"+genNo);
  }

  public setGeneration(genNo, generationObj){
    return set(this.baseUrl+"generation/"+genNo, generationObj);
  }

}
