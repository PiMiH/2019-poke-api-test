import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FeedbackComponent } from '../components/feedback/feedback.component';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private MatSnackBar: MatSnackBar,
  ) { }

  openSnackBar(msg:string, displayProgress:boolean, duration:number) { setTimeout(()=>{
    this.MatSnackBar.openFromComponent(FeedbackComponent, {data: {msg:msg,progress:displayProgress}, duration: duration});
  })}
}
