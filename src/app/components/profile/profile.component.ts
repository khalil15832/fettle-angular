import { DiseaseCleaned } from 'src/app/models/disease';
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { Router } from '@angular/router';
import { DiseaseService } from '../../services/disease.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private diseaseService: DiseaseService
  ) {}
  user!: User | null;
  d_list!: string;
  dListItems!: (DiseaseCleaned | undefined)[];

  ngOnInit(): void {
    if (this.userService.user) {
      this.user = this.userService.user;
      this.initialize();
      return;
    }
    if (window.sessionStorage.getItem('token')) {
      this.userService.loginEmitter.subscribe((user: User) => {
        this.user = user;
        this.initialize();
      });
    }
    this.router.navigate(['/login-register']);
  }

  initialize(): void {
    this.d_list = this.userService.user!.d_list;
    this.diseaseService.getDiseaseList().subscribe((list) => {
      this.dListItems = list.filter((disease) => {
        return this.d_list
          .split(' ')
          .includes(disease.cleaned_disease.split(' ').join('_'));
      });
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.userService.logout();
  }
}
