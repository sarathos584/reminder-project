import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private r: Router) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(`^[a-zA-Z0-9_-]{3,16}$
    `)]],
    password: [
      '',
      [Validators.required, Validators.pattern('[0-9a-zA-Z*&$@!]{4,}')],
    ],
  });

  btnClick(){
    let username:any = this.loginForm.value.username;
    let password:any  = this.loginForm.value.password;
    // dummy data 
    console.log(username,password)
    this.r.navigateByUrl('/dashboard')
  }
};
