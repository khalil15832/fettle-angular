import { Component, OnInit } from '@angular/core';
import { DiseaseService } from './services/disease.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private diseaseService: DiseaseService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    let token = window.sessionStorage.getItem('token');
    if (token) {
      this.userService.authThruToken(parseInt(token));
    }
  }
}
