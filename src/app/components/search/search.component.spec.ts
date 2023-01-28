import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from './search.component';
import { DiseaseService } from 'src/app/services/disease.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let componentFixture: ComponentFixture<SearchComponent>;
  let diseaseService: DiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    diseaseService = TestBed.inject(DiseaseService);
    componentFixture = TestBed.createComponent(SearchComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to disease List observable upon initialization', () => {
    spyOn(diseaseService, 'getDiseaseList').and.callThrough();
    component.ngOnInit();

    expect(diseaseService.getDiseaseList).toHaveBeenCalled();
  });

  it('should filter diseases when user makes a search', () => {
    component.diseaseList = [
      {
        cleaned_disease: 'disease 1',
        disease: 'disease 1',
        primary_description: 'description 1',
        rarity: 'rarity 1',
        raw_symptoms: ['symptom 1', 'symptom 2'],
        secondary_description: 'description 1b',
        subtitle: 'subtitle 1',
        symptom_possibility: 'possibility 1',
      },
      {
        cleaned_disease: 'disease 2',
        disease: 'disease 2',
        primary_description: 'description 2',
        rarity: 'rarity 2',
        raw_symptoms: ['symptom 3', 'symptom 4'],
        secondary_description: 'description 2b',
        subtitle: 'subtitle 2',
        symptom_possibility: 'possibility 2',
      },
    ];

    component.query = '';
    component.search();

    expect(component.filteredList).toEqual([
      {
        cleaned_disease: 'disease 1',
        disease: 'disease 1',
        primary_description: 'description 1',
        rarity: 'rarity 1',
        raw_symptoms: ['symptom 1', 'symptom 2'],
        secondary_description: 'description 1b',
        subtitle: 'subtitle 1',
        symptom_possibility: 'possibility 1',
      },
      {
        cleaned_disease: 'disease 2',
        disease: 'disease 2',
        primary_description: 'description 2',
        rarity: 'rarity 2',
        raw_symptoms: ['symptom 3', 'symptom 4'],
        secondary_description: 'description 2b',
        subtitle: 'subtitle 2',
        symptom_possibility: 'possibility 2',
      },
    ]);

    component.query = 'disease 1';
    component.search();

    expect(component.filteredList).toEqual([
      {
        cleaned_disease: 'disease 1',
        disease: 'disease 1',
        primary_description: 'description 1',
        rarity: 'rarity 1',
        raw_symptoms: ['symptom 1', 'symptom 2'],
        secondary_description: 'description 1b',
        subtitle: 'subtitle 1',
        symptom_possibility: 'possibility 1',
      },
    ]);
  });
});
