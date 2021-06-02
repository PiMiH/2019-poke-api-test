import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { NouisliderComponent } from 'ng2-nouislider';
import { MatSort } from '@angular/material/sort';
import { CacheService } from 'src/app/services/cache.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {

  @ViewChild('slider', null) slider: NouisliderComponent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private speciesArr = []; // a copy of all the pokemon objects that will not be displayed or edited but is used create filtered array
  public tableDataLoaded = false;
  public dataSource = new MatTableDataSource<any>([]); // filtered version of speciesArr
  public displayedColumns: string[] = ['name', 'weight', 'height', 'speed', 'spDefense', 'spAttack', 'defense', 'attack', 'hp', 'type'];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private cacheService: CacheService,
    private feedbackService: FeedbackService,
  ) { }

  ngOnInit() {
    // set table sorting and paginator
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
    this.dataSource.sort.direction = 'asc';
    this.dataSource.sort.active = 'name';
    this.beginUrlSub()

  }

  beginUrlSub() {
    this.activatedRoute.paramMap.subscribe(async (res)=>{

      const genNo = parseInt(res.get("number"));
      this.dataSource.data = []
      this.tableDataLoaded = false;

      this.feedbackService.openSnackBar("Loading table pokemon", true, 0);

      let generation;
      try {
        generation = await this.cacheService.getGeneration(genNo);
      } catch (error) { console.log(error) }
      if(!generation) { // if generation==false does not exist in cache so fall back to  call to the api
        try {
          generation = await this.apiService.getGeneration(genNo).toPromise()
        } catch (error) { 
          this.tableDataLoaded = true;
          return this.feedbackService.openSnackBar("Failed to get table pokemon", false, 3500); 
        }
        this.cacheService.setGeneration(genNo, generation) // cache the generation obj
      } 


      const pokemonArr = generation["pokemon_species"];
      let promiseArr = [];
      for (let i = 0; i < pokemonArr.length; i++) {
        const pokemonId = parseInt(pokemonArr[i].url.split("/")[6]);
        promiseArr.push(this.getPokemonPromise(pokemonId));
      }

      try {
        this.speciesArr = await Promise.all(promiseArr);
      } catch (error) {
        this.tableDataLoaded = true;
        return this.feedbackService.openSnackBar("Failed to get table pokemon", false, 3500); 
      }

      //set data source
      this.dataSource.data = this.dataSource.data.concat(this.speciesArr);
      this.tableDataLoaded = true;
      return this.feedbackService.openSnackBar("Pokemon loaded", false, 3500);
    });
  }

  getPokemonPromise(pokemonId) {return new Promise(async (resolve, reject)=>{
    // try to get pokemon from cache
    let pokemon;
    try {
      pokemon = await this.cacheService.getPokemon(pokemonId);
    } catch (error) { console.log(error); }
    if(!pokemon) {  // if pokemon not found in cache go on to make api requests
      try {
        pokemon = await this.apiService.getPokemon(pokemonId).toPromise();
        this.cacheService.setPokemon(pokemonId, pokemon);
      } catch (error) { return reject(error); }
    }
    return resolve (pokemon);
  })}

  onFilterUpdate(fltrObj) {
    const results = this.speciesArr.filter((pokemon) => {
      // check types
      let pokeTypesArr = [];
      const typesObj = pokemon.types;
      for (let i = 0; i < typesObj.length; i++) pokeTypesArr.push(typesObj[i].type.name)
      if(!pokeTypesArr.some(r=> fltrObj.types.includes(r))) return false;

      // other filters
      if(
        pokemon.name.includes(fltrObj.name) && // name filter
        (pokemon.height >= fltrObj.height[0] &&  pokemon.height <= fltrObj.height[1]) && // height filter
        (pokemon.weight >= fltrObj.weight[0] &&  pokemon.weight <= fltrObj.weight[1]) && // weight filter
        (pokemon.stats[0].base_stat >= fltrObj.speed[0] &&  pokemon.stats[0].base_stat <= fltrObj.speed[1]) && // stats filters after here
        (pokemon.stats[1].base_stat >= fltrObj.spDef[0] &&  pokemon.stats[1].base_stat <= fltrObj.spDef[1]) &&
        (pokemon.stats[2].base_stat >= fltrObj.spAtt[0] &&  pokemon.stats[2].base_stat <= fltrObj.spAtt[1]) &&
        (pokemon.stats[3].base_stat >= fltrObj.def[0] &&  pokemon.stats[3].base_stat <= fltrObj.def[1]) &&
        (pokemon.stats[4].base_stat >= fltrObj.att[0] &&  pokemon.stats[4].base_stat <= fltrObj.att[1]) &&
        (pokemon.stats[5].base_stat >= fltrObj.hp[0] &&  pokemon.stats[5].base_stat <= fltrObj.hp[1])
      ) { return true; }
      return false;
    });

    this.dataSource.data = [].concat(results);
  }

}