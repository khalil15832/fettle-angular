import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Disease } from '../models/disease';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  constructor(private httpClient: HttpClient) {}
  searchQueryChangeEmitter: EventEmitter<string> = new EventEmitter();
  private searchQuery: string = '';
  private diseaseList!: Disease[];
}
