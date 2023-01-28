import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { QueryComponent } from './query.component';
import { DiseaseService } from 'src/app/services/disease.service';
import { of } from 'rxjs';

describe('QueryComponent', () => {
  let component: QueryComponent;
  let componentFixture: ComponentFixture<QueryComponent>;
  let diseaseService: DiseaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QueryComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [DiseaseService],
    }).compileComponents();
  });

  beforeEach(() => {
    diseaseService = TestBed.inject(DiseaseService);
    componentFixture = TestBed.createComponent(QueryComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should query diseases matching user input symptoms', () => {
    const spy = spyOn(diseaseService, 'queryDisease').and.returnValue(
      of([
        {
          disease: 'disease_1',
          subtitle: 'disease_1 subtitle',
          cleaned_disease: 'disease_1',
          simScore: 0.5,
        },
      ])
    );
    component.query = 'cough, cold';
    component.search();
    expect(component.queriedList).toEqual([
      {
        disease: 'disease_1',
        subtitle: 'disease_1 subtitle',
        cleaned_disease: 'disease_1',
        simScore: 0.5,
      },
    ]);

    component.query = '';
    component.search();
    expect(component.queriedList).toEqual([]);
  });
});
