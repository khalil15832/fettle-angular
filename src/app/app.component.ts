import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    let token = window.sessionStorage.getItem('token');
    if (token) {
      this.userService.authThruToken(token);
    }
  }
}
