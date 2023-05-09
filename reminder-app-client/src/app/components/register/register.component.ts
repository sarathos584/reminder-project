import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,private r:Router ) {}

  registerForm = this.fb.group({
    fullname: [
      '',
      [
        Validators.required,
        Validators.pattern(`^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$`),
      ],
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.pattern(`^[a-zA-Z0-9_-]{3,16}$
  `),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern('[0-9a-zA-Z*&$@!]{4,}')],
    ],
  });

  btnClick() {
    let fullname = this.registerForm.value.fullname;
    let username = this.registerForm.value.username;
    let password = this.registerForm.value.password;
    console.log(fullname, username, password);
    this.r.navigateByUrl('/dashboard')
  }
}
