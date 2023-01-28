import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LrPageComponent } from './lr-page.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

describe('LrPageComponent', () => {
  let component: LrPageComponent;
  let fixture: ComponentFixture<LrPageComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LrPageComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // both fields (username and password) in both login and register forms have the same formControl structure.
  // It is enough to test one of them
  it('should determine when the form is valid/invalid', () => {
    component.loginFormGroup.controls.username.setValue('');
    component.loginFormGroup.controls.password.setValue('');

    expect(component.loginFormGroup.valid).toBeFalsy();

    component.loginFormGroup.controls.username.setValue('user');
    component.loginFormGroup.controls.password.setValue('password123');

    expect(component.loginFormGroup.valid).toBeFalsy();

    component.loginFormGroup.controls.username.setValue('username');
    component.loginFormGroup.controls.password.setValue('pass');

    expect(component.loginFormGroup.valid).toBeFalsy();

    component.loginFormGroup.controls.username.setValue('username');
    component.loginFormGroup.controls.password.setValue('password123');

    expect(component.loginFormGroup.valid).toBeTruthy();
  });

  it('should log the user in', () => {
    spyOn(userService, 'login');
    component.loginFormGroup.controls.username.setValue('username');
    component.loginFormGroup.controls.password.setValue('password123');

    component.login();

    expect(userService.login).toHaveBeenCalledWith('username', 'password123');
  });

  it('should register the user', () => {
    spyOn(userService, 'register');
    component.registerFormGroup.controls.username.setValue('username');
    component.registerFormGroup.controls.password.setValue('password123');

    component.register();

    expect(userService.register).toHaveBeenCalledWith(
      'username',
      'password123'
    );
  });

  it('should log out', () => {
    spyOn(userService, 'logout');
    component.logout();

    expect(userService.logout).toHaveBeenCalled();
  });

  it('should go to homepage', () => {
    spyOn(router, 'navigate');
    component.goToHome();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
