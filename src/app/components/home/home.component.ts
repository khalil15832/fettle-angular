import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  goToProfile(): void {
    if (this.userService.user) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login-register']);
    }
  }
}
