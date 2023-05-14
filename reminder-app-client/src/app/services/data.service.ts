import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const options = { headers: new HttpHeaders() };
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getToken() {
    const token = localStorage.getItem('token');
    console.log(token, 'client');
    let header = new HttpHeaders();
    if (token) {
      header = header.append('x-access-token', token);
      options.headers = header;
    }
    // console.log(options)
    return options;
  }

  register(fullname: any, username: any, password: any) {
    let data = {
      fullname,
      username,
      password,
    };
    return this.http.post('http://localhost:3000/register', data);
  }

  login(username: any, password: any) {
    let data = {
      username,
      password,
    };
    return this.http.post('http://localhost:3000/login', data);
  }

  addReminder(reminder: any, date: any, time: any) {
    let data = {
      reminder,
      date,
      time,
    };
    return this.http.post(
      'http://localhost:3000/reminder',
      data,
      this.getToken()
    );
  }

  getReminders() {
    const data = { username: localStorage.getItem('currentUserName') };
    return this.http.post(
      'http://localhost:3000/reminders',
      data,
      this.getToken()
    );
  }

  deleteReminder(index: any) {
    const data = { index, username: localStorage.getItem('currentUserName') };
    return this.http.post(
      'http://localhost:3000/delete',
      data,
      this.getToken()
    );
  }

  editReminder(index:any,reminder:any,date:any,time:any){
    const data = {
      index,
      username: localStorage.getItem('currentUserName'),
      reminder,
      date,
      time
    }
    return this.http.post(
      'http://localhost:3000/edit',
      data,
      this.getToken()
    );
  }
}
