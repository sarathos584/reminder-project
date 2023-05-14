import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';
@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss'],
})
export class ReminderListComponent {
  reminders: any;
  constructor(
    private ds: DataService,
    private r: Router,
    public dialog: MatDialog
  ) {
    ds.getReminders().subscribe((res: any) => {
      this.reminders = res.data;
    });
  }
  openEditForm() {
    let dialogRef = this.dialog.open(EditFormComponent,{data:{reminder:this.reminders.reminder,date:this.reminders.date,time:this.reminders.time}});
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`dialog result: ${result}`)
    })
  }

  deleteBtn(event: any) {
    if (confirm('Are you sure to delete this reminder?')) {
      let reminder_index = event.target.id;
      console.log(reminder_index);
      let result = this.ds.deleteReminder(reminder_index);
      result.subscribe((response) => {
        console.log(response + 'from deleteBtn-client');
      });
    }
  }
}
