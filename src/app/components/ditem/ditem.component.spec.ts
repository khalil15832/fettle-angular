import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DitemComponent } from './ditem.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DiseaseService } from 'src/app/services/disease.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

describe('DitemComponent', () => {
  let component: DitemComponent;
  let fixture: ComponentFixture<DitemComponent>;
  let diseaseService: DiseaseService;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DitemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          // mock paramMap object: simply an observable created using RxJS's of(), with a getter for the id parameter
          useValue: {
            paramMap: of({ id: 'disease_1', get: (id: string) => 'disease_1' }),
          },
        },
        DiseaseService,
        UserService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    diseaseService = TestBed.inject(DiseaseService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the disease label from the route upon initialization, and subscribe to dlist change emitter', fakeAsync(() => {
    component.ngOnInit();

    tick();
    expect(component.disease_label).toEqual('disease_1');
  }));

  it('should get user', () => {
    userService.user = {
      token: 'token',
      username: 'username',
      d_list: 'disease_1',
    };
    expect(component.user).toEqual({
      token: 'token',
      username: 'username',
      d_list: 'disease_1',
    });
  });

  it('should save item to profile', () => {
    component.disease_label = undefined;
    spyOn(userService, 'saveItemToProfile');

    component.saveToProfile();
    expect(userService.saveItemToProfile).not.toHaveBeenCalled();

    component.disease_label = 'disease_1';

    component.saveToProfile();
    expect(userService.saveItemToProfile).toHaveBeenCalledWith('disease_1');
  });

  it('should remove item from profile', () => {
    component.disease_label = undefined;
    spyOn(userService, 'removeItemFromProfile');

    component.removeFromProfile();
    expect(userService.removeItemFromProfile).not.toHaveBeenCalled();

    component.disease_label = 'disease_1';

    component.removeFromProfile();
    expect(userService.removeItemFromProfile).toHaveBeenCalledWith('disease_1');
  });

  it('should navigate back to home', () => {
    spyOn(router, 'navigate');

    component.goToHome();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should look up disease', () => {
    component.disease_label = 'disease_1';
    spyOn(window, 'open');

    component.lookDiseaseUp();

    expect(window.open).toHaveBeenCalledWith(
      'https://www.google.com/search?q=disease_1',
      '_blank'
    );
  });
});
