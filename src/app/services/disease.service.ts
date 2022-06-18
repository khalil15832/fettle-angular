import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { Disease, DiseaseCleaned, QueryItem } from '../models/disease';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  constructor(private httpClient: HttpClient) {}
  private cleanedDiseaseList!: DiseaseCleaned[];
  diseaseListUrl = 'http://localhost:5000/data';
  queryUrl = 'http://localhost:5000/query';

  fetchList(): Observable<DiseaseCleaned[]> {
    return this.httpClient.get<Disease[]>(this.diseaseListUrl).pipe(
      map((diseaseList: Disease[]) => {
        return diseaseList.map((disease: Disease) => {
          return {
            cleaned_disease: disease.cleaned_disease,
            disease: disease.disease,
            primary_description: disease.primary_description,
            rarity: disease.rarity,
            raw_symptoms: JSON.parse(disease.raw_symptoms || '[]'),
            secondary_description: disease.secondary_description,
            subtitle: disease.subtitle,
            symptom_possibility: disease.symptom_possibility,
          };
        });
      })
    );
  }

  getDiseaseList(): Observable<DiseaseCleaned[]> {
    if (this.cleanedDiseaseList) {
      return of(this.cleanedDiseaseList);
    }
    this.fetchList().subscribe((list) => {
      this.cleanedDiseaseList = list;
    });
    return this.fetchList();
  }

  getDiseaseDetails(label: string | undefined): DiseaseCleaned | undefined {
    if (this.cleanedDiseaseList) {
      return this.cleanedDiseaseList.filter((disease: DiseaseCleaned) => {
        return disease.cleaned_disease.split(' ').join('_') === label;
      })[0];
    }
    this.getDiseaseList().subscribe(() => {
      return this.getDiseaseDetails(label);
    });
    return undefined;
  }

  queryDisease(query: string): Observable<QueryItem[]> {
    return this.httpClient.get<QueryItem[]>(this.queryUrl, {
      params: {
        query: query,
      },
    });
  }
}
