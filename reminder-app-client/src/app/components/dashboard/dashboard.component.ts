import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private fb: FormBuilder,private ds:DataService,private r:Router) {}
  reminderForm = this.fb.group({
    reminder: ['',[Validators.required]],
    date: ['',[Validators.required]],
    time: ['',[Validators.required]],
  });
  btnClick() {
    let reminder = this.reminderForm.value.reminder;
    let date = this.reminderForm.value.date;
    let time = this.reminderForm.value.time;
    console.log(reminder,date,time)
    if(this.reminderForm.valid){
      let result = this.ds.addReminder(reminder,date,time)
      result.subscribe(
        (response:any)=>{
          if(response){
            alert(response.message)
            this.r.navigateByUrl('reminder-list')
          }
        },
        (err:any)=>{
          alert(err.error.message)
        }
      )
    }
    else{
      alert('Invalide input!')
    }
  }
}
