import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should go to profile', () => {
    spyOn(router, 'navigate');
    userService.user = {
      token: 'token',
      username: 'username',
      d_list: 'disease_1',
    };

    component.goToProfile();

    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should redirect to login page instead', () => {
    spyOn(router, 'navigate');
    userService.user = null;

    component.goToProfile();

    expect(router.navigate).toHaveBeenCalledWith(['/login-register']);
  });
});
