import { Component, OnInit } from '@angular/core';
import { DiseaseService } from './services/disease.service';
import { DiseaseCleaned } from './models/disease';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private diseaseService: DiseaseService) {}
  ngOnInit(): void {}
}
