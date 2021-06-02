import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { 
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatChipsModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material';
import { NouisliderModule } from 'ng2-nouislider';

import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { FilterComponent } from './components/filter/filter.component';
import { PokemonTabSpritesComponent } from './components/pokemon-tab-sprites/pokemon-tab-sprites.component';
import { PokemonTabItemsComponent } from './components/pokemon-tab-items/pokemon-tab-items.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonTableComponent,
    PokemonComponent,
    FilterComponent,
    PokemonTabSpritesComponent,
    PokemonTabItemsComponent,
    FeedbackComponent,
    LoadingOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    NouisliderModule,
    
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FeedbackComponent]
})
export class AppModule { }
