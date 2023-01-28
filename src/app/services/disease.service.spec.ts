import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DiseaseService } from './disease.service';
import { of } from 'rxjs';

describe('DiseaseService', () => {
  let diseaseService: DiseaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiseaseService],
    });
    diseaseService = TestBed.inject(DiseaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the service', () => {
    expect(diseaseService).toBeTruthy();
  });

  it('should fetch diseases', fakeAsync(() => {
    diseaseService.fetchList().subscribe((data) => {
      expect(data).toEqual([
        {
          cleaned_disease: 'd_name',
          disease: 'd_name_raw',
          primary_description: 'primary_description',
          rarity: 'd_rarity',
          raw_symptoms: ['d_symptoms'],
          secondary_description: 'secondary_description',
          subtitle: 'd_subtitle',
          symptom_possibility: 'd_symptom_possibility',
        },
      ]);
    });

    let req = httpMock.expectOne('http://localhost:5000/data');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        cleaned_disease: 'd_name',
        disease: 'd_name_raw',
        primary_description: 'primary_description',
        rarity: 'd_rarity',
        raw_symptoms: '["d_symptoms"]',
        secondary_description: 'secondary_description',
        subtitle: 'd_subtitle',
        symptom_possibility: 'd_symptom_possibility',
      },
    ]);
    flushMicrotasks();

    httpMock.verify();
  }));

  it('should get disease list', () => {
    spyOn(diseaseService, 'fetchList').and.returnValue(
      of([
        {
          cleaned_disease: 'd_name',
          disease: 'd_name_raw',
          primary_description: 'primary_description',
          rarity: 'd_rarity',
          raw_symptoms: ['d_symptoms'],
          secondary_description: 'secondary_description',
          subtitle: 'd_subtitle',
          symptom_possibility: 'd_symptom_possibility',
        },
      ])
    );

    diseaseService.getDiseaseList();
    expect(diseaseService.fetchList).toHaveBeenCalled();
  });

  it('should get disease details', fakeAsync(() => {
    spyOn(diseaseService, 'fetchList').and.returnValue(
      of([
        {
          cleaned_disease: 'd_name',
          disease: 'd_name_raw',
          primary_description: 'primary_description',
          rarity: 'd_rarity',
          raw_symptoms: ['d_symptoms'],
          secondary_description: 'secondary_description',
          subtitle: 'd_subtitle',
          symptom_possibility: 'd_symptom_possibility',
        },
      ])
    );
    diseaseService.getDiseaseList();
    flushMicrotasks();

    expect(diseaseService.getDiseaseDetails('d_name')).toEqual({
      cleaned_disease: 'd_name',
      disease: 'd_name_raw',
      primary_description: 'primary_description',
      rarity: 'd_rarity',
      raw_symptoms: ['d_symptoms'],
      secondary_description: 'secondary_description',
      subtitle: 'd_subtitle',
      symptom_possibility: 'd_symptom_possibility',
    });
  }));

  it('should query the disease', fakeAsync(() => {
    diseaseService.queryDisease('disease').subscribe((data) => {
      expect(data).toEqual([
        {
          disease: 'disease',
          subtitle: 'subtitle',
          cleaned_disease: 'cleaned_disease',
          simScore: 0.5,
        },
      ]);
    });

    let req = httpMock.expectOne('http://localhost:5000/query?query=disease');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        disease: 'disease',
        subtitle: 'subtitle',
        cleaned_disease: 'cleaned_disease',
        simScore: 0.5,
      },
    ]);
    flushMicrotasks();

    httpMock.verify();
  }));
});
