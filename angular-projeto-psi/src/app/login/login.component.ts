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
    console.log("User ao entrar no login inicialmente:" + this.userService.getUser());
    if(this.userService.getUser()){
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
    this.userService.loginUser(username, password).subscribe(res => {
      var response = res.response;
      if (response) {
        this.router.navigate(['/dashboard']);
        this.userService.setUser(username);
        console.log("User ao fazer login" + this.userService.getUser())
      } else {
        this.displayError("Username ou password errados");
      }
    });
  }
  displayError(msg: string): void {
    this.error = msg;
  }
}
