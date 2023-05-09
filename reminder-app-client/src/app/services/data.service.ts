import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const options = {headers:new HttpHeaders}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getToken(){
    
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
      headers=headers.append("x-accesss-token",token)
      options.headers = headers;
    }
    return options
  }

  register(fullname: any, username: any, password: any) {
    let data = {
      fullname,
      username,
      password,
    };
    return this.http.post('http://localhost:3000/register', data);
  }

  login(username:any,password:any){
    let data ={
      username,
      password
    }
    return this.http.post('http://localhost:3000/login', data);
  }
  
  addReminder(reminder:any,date:any,time:any){
    let data = {
      reminder,
      date,
      time
    }
    return this.http.post('http://localhost:3000/reminder', data,this.getToken());
  }
}
