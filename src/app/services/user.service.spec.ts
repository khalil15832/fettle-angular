import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';
import { Router } from '@angular/router';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should create the service', () => {
    expect(userService).toBeTruthy();
  });

  it('should perform login', fakeAsync(() => {
    const storageSpy = spyOn(window.sessionStorage, 'setItem');
    const routerSpy = spyOn(router, 'navigate');

    userService.login('test', 'test');
    let req = httpMock.expectOne('http://localhost:5000/user/login');
    expect(req.request.method).toBe('POST');
    req.flush({
      token: 'token',
      success: true,
      user: 'user',
      d_list: '',
      message: 'message',
    });
    flushMicrotasks();

    expect(storageSpy).toHaveBeenCalledWith('token', 'token');
    expect(routerSpy).toHaveBeenCalledWith(['/']);
    httpMock.verify();
  }));

  it('should perform registration', fakeAsync(() => {
    spyOn(window.sessionStorage, 'setItem');
    spyOn(router, 'navigate');

    userService.register('test', 'test');
    let req = httpMock.expectOne('http://localhost:5000/user/register');
    expect(req.request.method).toBe('POST');
    req.flush({
      token: 'token',
      success: true,
      user: 'user',
      d_list: 'disease_1',
      message: 'message',
    });
    flushMicrotasks();

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      'token',
      'token'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    httpMock.verify();
  }));

  it('should perform logout', () => {
    const storageSpy = spyOn(window.sessionStorage, 'removeItem');
    const routerSpy = spyOn(router, 'navigate');

    userService.logout();

    expect(userService.user).toBeNull();
    expect(storageSpy).toHaveBeenCalledWith('token');
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });

  it('should perform authorization using JWT token', fakeAsync(() => {
    spyOn(userService.loginEmitter, 'emit');

    userService.authThruToken('token');
    let req = httpMock.expectOne('http://localhost:5000/user/tokenauth');
    expect(req.request.method).toBe('POST');
    req.flush({
      token: 'token',
      success: true,
      user: 'user',
      d_list: 'disease_1',
      message: 'message',
    });
    flushMicrotasks();

    expect(userService.loginEmitter.emit).toHaveBeenCalled();
  }));

  it('should save item to profile when bookmarked', fakeAsync(() => {
    userService.user = {
      token: 'token',
      username: 'username',
      d_list: 'disease_1',
    };

    spyOn(userService.dListChangeEmitter, 'emit');

    userService.saveItemToProfile('disease_1');
    let req = httpMock.expectOne('http://localhost:5000/user/profile/add');
    expect(req.request.method).toBe('PUT');
    req.flush({
      token: 'token',
      success: true,
      user: 'user',
      d_list: 'disease_1',
      message: 'message',
    });
    flushMicrotasks();

    expect(userService.dListChangeEmitter.emit).toHaveBeenCalledWith(
      'disease_1'
    );
  }));

  it('should remove item from profile when unbookmarked', fakeAsync(() => {
    userService.user = {
      token: 'token',
      username: 'username',
      d_list: 'disease_1',
    };

    spyOn(userService.dListChangeEmitter, 'emit');

    userService.removeItemFromProfile('disease_1');
    let req = httpMock.expectOne('http://localhost:5000/user/profile/remove');
    expect(req.request.method).toBe('PUT');
    req.flush({
      token: 'token',
      success: true,
      user: 'user',
      d_list: 'disease_1',
      message: 'message',
    });

    expect(userService.dListChangeEmitter.emit).toHaveBeenCalledWith(
      'disease_1'
    );
  }));
});
