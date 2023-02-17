import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import pagePopInAnimation from 'src/app/animations/pagePopInAnimation';

@Component({
  selector: 'app-lr-page',
  templateUrl: './lr-page.component.html',
  animations: pagePopInAnimation,
})
export class LrPageComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  USERNAME_MIN_LENGTH = 6;
  USERNAME_MAX_LENGTH = 12;
  PASSWORD_MIN_LENGTH = 8;
  PASSWORD_MAX_LENGTH = 20;

  loginFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(this.USERNAME_MIN_LENGTH),
      Validators.maxLength(this.USERNAME_MAX_LENGTH),
      Validators.pattern('^[A-Za-z][A-Za-z0-9]*'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.PASSWORD_MIN_LENGTH),
      Validators.maxLength(this.PASSWORD_MAX_LENGTH),
    ]),
  });
  registerFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(this.USERNAME_MIN_LENGTH),
      Validators.maxLength(this.USERNAME_MAX_LENGTH),
      Validators.pattern('^[A-Za-z][A-Za-z0-9]*'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.PASSWORD_MIN_LENGTH),
      Validators.maxLength(this.PASSWORD_MAX_LENGTH),
    ]),
  });

  ngOnInit(): void {}

  getObjectKeys(object: object): string[] {
    return Object.keys(object);
  }

  login(): void {
    this.userService.login(
      this.loginFormGroup.controls['username'].value,
      this.loginFormGroup.controls['password'].value
    );
  }

  get user(): User | null {
    return this.userService.user;
  }

  register(): void {
    this.userService.register(
      this.registerFormGroup.controls['username'].value,
      this.registerFormGroup.controls['password'].value
    );
  }

  logout(): void {
    this.userService.logout();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
