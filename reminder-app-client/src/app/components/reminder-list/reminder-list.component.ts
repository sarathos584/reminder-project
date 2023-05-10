import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent {
reminders:any;
constructor(private ds:DataService,private r:Router){
  ds.getReminders().subscribe((res:any)=>{
    console.log(res +"from getReminder-client")
    this.reminders = res.data
  })
}

}
