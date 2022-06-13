import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrPageComponent } from './lr-page.component';

describe('LrPageComponent', () => {
  let component: LrPageComponent;
  let fixture: ComponentFixture<LrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
