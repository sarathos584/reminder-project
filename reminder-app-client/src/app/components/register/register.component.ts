import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private r: Router,
    private ds: DataService
  ) {}

  registerForm = this.fb.group({
    fullname: [
      '',
      [
        Validators.required
      ],
    ],
    username: [
      '',
      [
        Validators.required
      ],
    ],
    password: [
      '',
      [Validators.required],
    ],
  });

  btnClick() {
    let fullname = this.registerForm.value.fullname;
    let username = this.registerForm.value.username;
    let password = this.registerForm.value.password;
    console.log(fullname, username, password);
    if (this.registerForm.valid) {
      let result = this.ds.register(fullname, username, password);
      result.subscribe(
        (response: any) => {
          if (response) {
            alert(response.message);
            this.r.navigateByUrl('');
          }
        },
        (err: any) => {
          alert(err.error.message);
        }
      );
    } else {
      alert('Invalid data!');
    }
  }
}
