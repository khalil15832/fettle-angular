import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

export interface User {
  token: string;
  username: string;
  d_list: string;
}

interface loginResponse {
  token?: string;
  success: boolean;
  user?: string;
  d_list?: string;
  message?: string;
}

interface saveResponse {
  success: boolean;
  d_list?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  dListChangeEmitter = new EventEmitter();
  loginEmitter = new EventEmitter();
  constructor(private httpClient: HttpClient, private router: Router) {}

  userApiUrl = 'http://localhost:5000/user/';
  user!: User | null;

  login(username: string, password: string): void {
    this.httpClient
      .post<loginResponse>(this.userApiUrl + 'login', {
        username: username,
        password: password,
      })
      .subscribe(
        (response: loginResponse) => {
          if (response['success']) {
            if (
              response['user'] &&
              response['d_list'] !== null &&
              response['token']
            ) {
              this.user = {
                token: response['token'],
                username: response['user'],
                d_list: response['d_list'] || '',
              };
            }
            window.sessionStorage.setItem('token', this.user!.token);
          }
          this.router.navigate(['/']);
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
          if (
            response['user'] &&
            response['d_list'] !== null &&
            response['token']
          ) {
            this.user = {
              token: response['token'],
              username: response['user'],
              d_list: response['d_list'] || '',
            };
          }
          window.sessionStorage.setItem('token', this.user!.token);
          this.router.navigate(['/']);
        } else {
          window.alert(response['message']);
        }
      });
  }

  logout(): void {
    this.user = null;
    window.sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  authThruToken(token: string): void {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.httpClient
      .post<loginResponse>(this.userApiUrl + 'tokenauth', {}, { headers })
      .subscribe((response: loginResponse) => {
        if (response['success']) {
          if (
            response['user'] &&
            response['d_list'] !== null &&
            response['token']
          ) {
            this.user = {
              token: response['token'],
              username: response['user'],
              d_list: response['d_list'] || '',
            };
            this.loginEmitter.emit(this.user);
          }
        }
      });
  }

  saveItemToProfile(dis: string): void {
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user!.token
    );
    this.httpClient
      .put<loginResponse>(
        this.userApiUrl + 'profile/add',
        {
          label: dis,
        },
        { headers }
      )
      .subscribe(
        (response: saveResponse) => {
          if (response['success']) {
            if (response['d_list']) {
              this.user!.d_list = response['d_list'];
              this.dListChangeEmitter.emit(this.user!.d_list);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  removeItemFromProfile(dis: string): void {
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user!.token
    );
    this.httpClient
      .put<loginResponse>(
        this.userApiUrl + 'profile/remove',
        {
          label: dis,
        },
        { headers }
      )
      .subscribe(
        (response: saveResponse) => {
          if (response['success']) {
            if (
              response['d_list'] !== null &&
              response['d_list'] !== undefined
            ) {
              this.user!.d_list = response['d_list'];
              this.dListChangeEmitter.emit(this.user!.d_list);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
