import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DitemComponent } from './ditem.component';

describe('DitemComponent', () => {
  let component: DitemComponent;
  let fixture: ComponentFixture<DitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
