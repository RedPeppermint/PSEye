import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
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
    if (this.userService.getUser()) {
      this.router.navigate(["/dashboard"]);
    }
  }

  login(username: string, password: string): void {
    username = username.trim();
    if (!username || !password) {
      this.displayError("Campos obrigatórios *");
      this.incomplete = true;
      return;
    }

    this.incomplete = false;
    this.userService.loginUser(username, password)
      .subscribe(result => {
        if (!result.token || !result.model)
          this.displayError('Could not authenticate');
        else
          this.router.navigate(["/dashboard"]);
      }
      );
  }
  displayError(msg: string): void {
    this.error = msg;
  }
}
