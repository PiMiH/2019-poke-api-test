import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as wNumb from "wnumb";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input("speciesArr") speciesArr;
  @Output("filterUpdate") filterUpdate = new EventEmitter();

  public typeArr: string[] = [
    'bug','dark','dragon','electric','fairy','fighting','fire','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water'
  ];

  // multiple very similar objects required to allow each slider to have its own properties which are set later
  public weightSldrCnfg: any = { behaviour: 'drag', connect: true, step: 1, start: [0, 0], tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})] };
  public heightSldrCnfg: any = { behaviour: 'drag', connect: true, step: 1, start: [0, 0], tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})] };
  public speedSldrCnfg: any = { behaviour: 'drag', connect: true, step: 1, start: [0, 0], tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})] };
  public spDefSldrCnfg: any = { behaviour: 'drag', connect: true, step: 1, start: [0, 0], tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})] };
  public spAttSldrCnfg: any = { behaviour: 'drag', connect: true, step: 1, start: [0, 0], tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})] };
  public defSldrCnfg: any = { behaviour: 'drag', connect: true, step: 1, start: [0, 0], tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})] };
  public attSldrCnfg: any = { behaviour: 'drag', connect: true, step: 1, start: [0, 0], tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})] };
  public hpSldrCnfg: any = { behaviour: 'drag', connect: true, step: 1, start: [0, 0], tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})] };

  public filterFormGrp = new FormGroup({
    name: new FormControl(''),
    types: new FormControl(this.typeArr),
    weight: new FormControl([0, 9999999]),
    height: new FormControl([0, 9999999]),
    speed: new FormControl([0, 9999999]),
    spDef: new FormControl([0, 9999999]),
    spAtt: new FormControl([0, 9999999]),
    def: new FormControl([0, 9999999]),
    att: new FormControl([0, 9999999]),
    hp: new FormControl([0, 9999999]),
  });

  constructor() { }

  ngOnInit() {
    this.filterFormGrp.valueChanges.subscribe(filterObj => {
      this.filterUpdate.emit(filterObj) 
    });
  }

  resetFrmGrp(e) {
    this.filterFormGrp.setValue({
      name: "",
      types: this.typeArr,
      weight: [0, 9999999],
      height: [0, 9999999],
      speed: [0, 9999999],
      spDef: [0, 9999999],
      spAtt: [0, 9999999],
      def: [0, 9999999],
      att: [0, 9999999],
      hp: [0, 9999999]
    });
    setTimeout(()=>{this.filterFormGrp.markAsPristine();})
  }

}
