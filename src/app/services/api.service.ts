import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://pokeapi.co/api/v2/";

  constructor(private httpClient: HttpClient){}

  public getPokemon(id: number){
    return this.httpClient.get(this.baseUrl+"pokemon/"+id);
  }

  public getGenerations(){
    return this.httpClient.get(this.baseUrl+"generation");
  }
  
  public getGeneration(genNo: number){
    return this.httpClient.get(this.baseUrl+"generation/"+genNo);
  }

  public getItem(itemNo: number){
    return this.httpClient.get(this.baseUrl+"item/"+itemNo);
  }

  // public getTest(){
  //   const httpOptions = {};
  //   return this.httpClient.get(this.baseUrl, httpOptions);
  // }

}