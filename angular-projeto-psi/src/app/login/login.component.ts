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
      var id = this.userService.getUserId();
      var url = "profile/" + id;
      this.router.navigate([url]);
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
        if (!result.token || !result.model) {
          this.displayError('Could not authenticate');
        }
        else {
          sessionStorage.setItem("access_token", result.token);
          sessionStorage.setItem("user", result.model);
          var id = this.userService.getUserId();
          console.log(id);
          var url = "profile/" + id;
          this.router.navigate([url]);
        }

      }
      );
  }
  displayError(msg: string): void {
    this.error = msg;
  }
}
