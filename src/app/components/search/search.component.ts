import { DiseaseCleaned } from './../../models/disease';
import { Component, OnInit } from '@angular/core';
import { DiseaseService } from 'src/app/services/disease.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  constructor(private diseaseService: DiseaseService) {}
  diseaseList!: DiseaseCleaned[];
  filteredList: DiseaseCleaned[] = [];
  query: string = '';

  ngOnInit(): void {
    this.diseaseService.getDiseaseList().subscribe((list) => {
      this.diseaseList = list;
      this.filteredList = list;
    });
  }
  
  search(): void {
    if (this.query === '') {
      this.filteredList = this.diseaseList;
    }
    this.filteredList = this.diseaseList.filter((disease) => {
      return disease.disease.toLowerCase().includes(this.query.toLowerCase());
    });
  }
}
