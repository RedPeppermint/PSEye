import { Component, OnInit } from '@angular/core';

import { User } from "../user";
import { UserService } from "../user.service";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = "PSEye";
  error = "";
  incomplete = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    username = username.trim();
    if (!username || !password) {
      this.displayError("Campos obrigatórios *");
      this.incomplete = true;
      return;
    }

    this.incomplete = false;
    if(this.userService.loginUser(username, password)) {
      this.router.navigate(['/dashboard']);

    } else {
      this.displayError("Username ou password errados");
      return;
    }
  }

  displayError(msg : string): void {
    this.error = msg;
  }

}
