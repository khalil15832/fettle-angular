import { Component, OnInit } from '@angular/core';
import { QueryItem } from 'src/app/models/disease';
import { DiseaseService } from 'src/app/services/disease.service';
import listAnimation from 'src/app/animations/listAnimations';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  animations: listAnimation,
})
export class QueryComponent implements OnInit {
  query: string = '';
  queriedList!: QueryItem[];
  constructor(private diseaseService: DiseaseService) {}

  ngOnInit(): void {}

  search(): void {
    if (this.query === '') {
      this.queriedList = [];
      return;
    }
    this.diseaseService.queryDisease(this.query).subscribe((list) => {
      this.queriedList = list;
    });
  }
}
