import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTabSpritesComponent } from './pokemon-tab-sprites.component';

describe('PokemonTabSpritesComponent', () => {
  let component: PokemonTabSpritesComponent;
  let fixture: ComponentFixture<PokemonTabSpritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonTabSpritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTabSpritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
