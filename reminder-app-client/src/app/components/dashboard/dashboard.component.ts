import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private fb: FormBuilder) {}
  reminderForm = this.fb.group({
    reminder: '',
    date: '',
    time: '',
  });
  btnClick() {
    let reminder = this.reminderForm.value.reminder;
    let date = this.reminderForm.value.date;
    let time = this.reminderForm.value.time;
    console.log(reminder,date,time)
  }
}
