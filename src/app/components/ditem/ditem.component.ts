import { Component, Input, OnInit } from '@angular/core';
import { DiseaseCleaned } from 'src/app/models/disease';
import { DiseaseService } from 'src/app/services/disease.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-ditem',
  templateUrl: './ditem.component.html',
  styleUrls: ['./ditem.component.css'],
})
export class DitemComponent implements OnInit {
  @Input() disease!: DiseaseCleaned | undefined;
  disease_label: string | undefined;

  constructor(
    private diseaseService: DiseaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      tap((id) => {
        id ? (this.disease_label = id) : (this.disease_label = undefined);
      })
    ).subscribe(() => {
      this.disease = this.diseaseService.getDiseaseDetails(this.disease_label);
      console.log(this.disease)
      if (!this.disease) {
        this.router.navigate(['/']);
      }
    })
  }
}
