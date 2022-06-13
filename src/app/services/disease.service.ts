import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { Disease, DiseaseCleaned } from '../models/disease';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  constructor(private httpClient: HttpClient) {}
  private cleanedDiseaseList!: DiseaseCleaned[];
  diseaseListUrl = 'http://localhost:5000/data';

  fetchList(): Observable<DiseaseCleaned[]> {
    return this.httpClient.get<Disease[]>(this.diseaseListUrl).pipe(
      map((diseaseList: Disease[]) => {
        return diseaseList.map((disease: Disease) => {
          return {
            cleaned_disease: disease.cleaned_disease,
            disease: disease.disease,
            primary_description: disease.primary_description,
            rarity: disease.rarity,
            raw_symptoms: JSON.parse(disease.raw_symptoms || "[]"),
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
    return this.fetchList();
  }
}
