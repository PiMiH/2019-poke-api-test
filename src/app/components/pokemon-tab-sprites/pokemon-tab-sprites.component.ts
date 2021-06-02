import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-tab-sprites',
  templateUrl: './pokemon-tab-sprites.component.html',
  styleUrls: ['./pokemon-tab-sprites.component.scss']
})
export class PokemonTabSpritesComponent implements OnInit {

  @Input("spritesObj") spritesObj;

  public spriteObjArr = [];

  constructor() { }

  ngOnInit() {
    const keys = Object.keys(this.spritesObj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      this.spriteObjArr.push({name:key.replace(/_/g," "), url: this.spritesObj[key]})
    }
  }

}
