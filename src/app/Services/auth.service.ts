// Service de auth com dados mockados por enquanto 

import { Injectable } from '@angular/core';
import { User } from '../Model/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    users: User[] = [
        { id: 1, 
          name: 'Vinicius Teste', 
          username: 'canutokr', 
          avatarUrl: 'https://via.placeholder.com/150/000000/FFFFFF/?text=User', 
          email: 'usuario@teste.com', 
          password: '123456', 
          createdAt: new Date('2026-02-10T09:20:00'), 
          updatedAt: new Date() },
    ];

  checkEmail(email: string): Observable<any> {

    const user = this.users.find(user => user.email === email);

    if (!user) {
      return of({ exists: false });
    } else {
      return of({ exists: true });
    }

  }

  login(email: string, password: string): Observable<any> {

    const user = this.users.find(user => user.email === email && user.password === password);

    if (!user) {
      return of({ success: false });
    } else {
      localStorage.setItem('authToken', '1234567890');
      this.setCurrentUser(user);
      console.log(user);
      return of({ success: true });
    }

  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

}   