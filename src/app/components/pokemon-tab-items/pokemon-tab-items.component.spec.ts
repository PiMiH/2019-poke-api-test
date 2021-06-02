import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTabItemsComponent } from './pokemon-tab-items.component';

describe('PokemonTabItemsComponent', () => {
  let component: PokemonTabItemsComponent;
  let fixture: ComponentFixture<PokemonTabItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonTabItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTabItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
