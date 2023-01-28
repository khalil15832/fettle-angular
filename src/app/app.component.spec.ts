import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should perform authorization using the token upon initialization', () => {
    const storageSpy = spyOn(window.sessionStorage, 'getItem').and.returnValue(
      'token'
    );
    const spy = spyOn(userService, 'authThruToken');
    component.ngOnInit();

    storageSpy.and.returnValue(null);
    component.ngOnInit();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
