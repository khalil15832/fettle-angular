import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lr-page',
  templateUrl: './lr-page.component.html',
  styleUrls: ['./lr-page.component.css'],
})
export class LrPageComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    let usernameInput = document.querySelector(
      '.login-username'
    ) as HTMLInputElement;
    let passwordInput = document.querySelector(
      '.login-password'
    ) as HTMLInputElement;
    this.userService.login(usernameInput.value, passwordInput.value);
  }

  get user(): User | null {
    return this.userService.user;
  }

  register(): void {
    let usernameInput = document.querySelector(
      '.register-username'
    ) as HTMLInputElement;
    let passwordInput = document.querySelector(
      '.register-password'
    ) as HTMLInputElement;
    this.userService.register(usernameInput.value, passwordInput.value);
  }

  logout(): void {
    this.userService.logout();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
