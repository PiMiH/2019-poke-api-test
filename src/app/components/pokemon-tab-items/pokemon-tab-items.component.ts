import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemon-tab-items',
  templateUrl: './pokemon-tab-items.component.html',
  styleUrls: ['./pokemon-tab-items.component.scss']
})
export class PokemonTabItemsComponent implements OnInit {

  @Input("itemsObj") itemsObj;

  public itemObjArr;

  constructor(
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    let promArr = [];
    for (let i = 0; i < this.itemsObj.length; i++) {
      const item = this.itemsObj[i];
      const itemNo = parseInt(item.item.url.split('/')[6])
      promArr.push(this.apiService.getItem(itemNo).toPromise());
    }

    try {
      this.itemObjArr = await Promise.all(promArr);
    } catch (error) { console.log(error )}
  }

}
