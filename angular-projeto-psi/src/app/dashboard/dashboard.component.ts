import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = "PSEye";

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
    if(!this.userService.getUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

}
