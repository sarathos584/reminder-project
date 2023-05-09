import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private r: Router,
    private ds: DataService
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  btnClick() {
    let username: any = this.loginForm.value.username;
    let password: any = this.loginForm.value.password;
    let result = this.ds.login(username, password);
    result.subscribe(
      (response: any) => {
        localStorage.setItem('currentUser', response.currentUser);
        localStorage.setItem('currentUserName', response.currentUserName);
        localStorage.setItem('token', response.token);
        alert(response.message);
        this.r.navigateByUrl('dashboard');
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
