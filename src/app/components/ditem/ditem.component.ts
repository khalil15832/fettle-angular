import { Component, Input, OnInit } from '@angular/core';
import { DiseaseCleaned } from 'src/app/models/disease';
import { DiseaseService } from 'src/app/services/disease.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { UserService, User } from 'src/app/services/user.service';

@Component({
  selector: 'app-ditem',
  templateUrl: './ditem.component.html',
})
export class DitemComponent implements OnInit {
  @Input() disease!: DiseaseCleaned | undefined;
  disease_label: string | undefined;
  saved: boolean = false;

  constructor(
    private diseaseService: DiseaseService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => {
          id ? (this.disease_label = id) : (this.disease_label = undefined);
        })
      )
      .subscribe(() => {
        this.disease = this.diseaseService.getDiseaseDetails(
          this.disease_label
        );
        if (!this.disease) {
          this.router.navigate(['/']);
        }
      });
    if (
      this.userService.user &&
      this.disease_label &&
      this.userService.user.d_list.includes(this.disease_label)
    ) {
      this.saved = true;
    }
    this.userService.dListChangeEmitter.subscribe((dList: Array<string>) => {
      if (this.disease_label && dList.includes(this.disease_label)) {
        this.saved = true;
      } else {
        this.saved = false;
      }
    });
  }

  get user(): User | null {
    return this.userService.user;
  }

  saveToProfile(): void {
    if (this.disease_label) {
      this.userService.saveItemToProfile(this.disease_label);
    }
  }

  removeFromProfile(): void {
    if (this.disease_label) {
      this.userService.removeItemFromProfile(this.disease_label);
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
