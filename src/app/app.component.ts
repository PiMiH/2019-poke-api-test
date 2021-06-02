import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { FeedbackService } from './services/feedback.service';
import { Generation } from './interfaces/generation';
import { Species } from './interfaces/species';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public sidenavOpen: boolean = false;

  public generations: Array<Generation> = [];
  public species: Array<Species> = [];
  public generationsLoaded: boolean = false;

  constructor(
    private apiService: ApiService,
    private feedbackService: FeedbackService
  ){ }

  ngOnInit() {

    setTimeout(()=>{this.sidenavOpen = true;}) // settimeout is for visual fix for sidenav

    this.feedbackService.openSnackBar("Loading generations", true, 0);

    // get generations
    this.apiService.getGenerations().subscribe(
      (res)=>{
        this.feedbackService.openSnackBar("Generations loaded", false, 3500);
        this.generations = res["results"];
        this.generationsLoaded = true;
      },
      (err)=>{
        this.feedbackService.openSnackBar("Failed to load generations", false, 3500);
      }
    )

  }

}
