import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  d_list: number[];
}

interface loginResponse {
  id?: number;
  success: boolean;
  user?: string;
  d_list?: number[];
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  userApiUrl = 'http://localhost:5000/user/';
  user!: User | null;

  login(username: string, password: string): void {
    console.log(username, password);
    this.httpClient
      .post<loginResponse>(this.userApiUrl + 'login', {
        username: username,
        password: password,
      })
      .subscribe(
        (response: loginResponse) => {
          console.log(response);
          if (response['success']) {
            if (response['user'] && response['d_list'] && response['id']) {
              this.user = {
                id: response['id'],
                username: response['user'],
                d_list: response['d_list'],
              };
            }
            window.sessionStorage.setItem('token', (this.user!.id).toString());
          }
          // this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  register(username: string, password: string): void {
    this.httpClient
      .post<loginResponse>(this.userApiUrl + 'register', {
        username,
        password,
      })
      .subscribe((response: loginResponse) => {
        if (response['success']) {
          if (response['user'] && response['d_list'] && response['id']) {
            this.user = {
              id: response['id'],
              username: response['user'],
              d_list: response['d_list'],
            };
          }
          window.sessionStorage.setItem('token', (this.user!.id).toString());
        } else {
          window.alert(response['message']);
        }
        // this.router.navigate(['/']);
      });
  }

  logout(): void {
    this.user = null;
    this.router.navigate(['/']);
    window.sessionStorage.removeItem('token');
  }

  authThruToken(token: number): void {
    this.httpClient
      .post<loginResponse>(this.userApiUrl + 'tokenauth', {
        token,
      })
      .subscribe((response: loginResponse) => {
        if (response['success']) {
          if (response['user'] && response['d_list'] && response['id']) {
            this.user = {
              id: response['id'],
              username: response['user'],
              d_list: response['d_list'],
            };
          } 
        }
        // this.router.navigate(['/']);
      });
  }
}
