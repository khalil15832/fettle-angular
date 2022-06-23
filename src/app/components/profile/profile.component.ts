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
    this.user = this.userService.user;
    this.d_list = this.userService.user!.d_list;
    this.dListItems = this.d_list.split(' ').map((label: string) => {
      return this.diseaseService.getDiseaseDetails(label);
    });
  }
}
