import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileComponent } from './profile.component';
import { UserService } from 'src/app/services/user.service';
import { DiseaseService } from 'src/app/services/disease.service';
import { Router } from '@angular/router';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let componentFixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;
  let diseaseService: DiseaseService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService, DiseaseService],
    }).compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    diseaseService = TestBed.inject(DiseaseService);
    router = TestBed.inject(Router);
    componentFixture = TestBed.createComponent(ProfileComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize on ngOnInit', () => {
    userService.user = null;
    spyOn(userService.loginEmitter, 'subscribe').and.callThrough();
    const spy = spyOn(component, 'initialize');

    component.ngOnInit();
    expect(userService.loginEmitter.subscribe).toHaveBeenCalled();

    userService.user = {
      token: 'token',
      username: 'username',
      d_list: 'd_list',
    };
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should initialize user data', () => {
    spyOn(diseaseService, 'getDiseaseList').and.callThrough();
    userService.user = {
      token: 'token',
      username: 'username',
      d_list: 'd_list',
    };
    component.d_list = '';
    component.initialize();
    expect(component.d_list).toEqual('d_list');
    expect(diseaseService.getDiseaseList).toHaveBeenCalled();
  });

  it('should go to home', () => {
    spyOn(router, 'navigate');
    component.goToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should logout', () => {
    spyOn(userService, 'logout');
    component.logout();
    expect(userService.logout).toHaveBeenCalled();
  });
});
