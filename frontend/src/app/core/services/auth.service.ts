import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  // ✅ LOGIN
  login(email: string, password: string){
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          if(res.success){
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
          }
        })
      );
  }

  // ✅ REGISTER
  register(email:string, password:string, name:string, role:string){
    return this.http.post<any>(`${this.baseUrl}/register`,
      { email, password, name, role }
    );
  }

  // ✅ CHECK LOGIN
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ GET USER
  getUser(){
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // ✅ LOGOUT
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}