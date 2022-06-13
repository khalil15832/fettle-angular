import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  username: string;
  d_list: number[];
}

interface loginResponse {
  success: boolean;
  username: string;
  d_list: number[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  userApiUrl = 'localhost:5000/user/';
  user!: User | null;

  login(username: string, password: string): void {
    this.httpClient
      .post<loginResponse>(this.userApiUrl + 'login', { username, password })
      .subscribe((response: loginResponse) => {
        if (response['success']) {
          this.user = {
            username: response['username'],
            d_list: response['d_list'],
          };
        }
        this.router.navigate(['/']);
      });
  }

  register(username: string, password: string): void {
    this.httpClient
      .post<loginResponse>(this.userApiUrl + 'register', {
        username,
        password,
      })
      .subscribe((response: loginResponse) => {
        if (response['success']) {
          this.user = {
            username: response['username'],
            d_list: response['d_list'],
          };
        }
        this.router.navigate(['/']);
      });
  }

  logout(): void {
    this.user = null;
    this.router.navigate(['/']);
  }
}
