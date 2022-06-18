import { Component, OnInit } from '@angular/core';
import { QueryItem } from 'src/app/models/disease';
import { DiseaseService } from 'src/app/services/disease.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  query: string = '';
  queriedList!: QueryItem[];
  constructor(private diseaseService: DiseaseService) { }

  ngOnInit(): void {
  }

  search(): void {
    if (this.query === '') {
      this.queriedList = [];
    }
    this.diseaseService.queryDisease(this.query).subscribe((list) => {
      this.queriedList = list;
    })
  }
}
