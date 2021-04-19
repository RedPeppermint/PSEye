import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = "PSEye";
  error = "";
  incomplete = false;
  errorPassConf = "";
  errors: Array<string>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.getUser()) {
      this.router.navigate(["/dashboard"]);
    }
  }

  register(name: string, email: string, username: string, password: string, conf: string): void {
    username = username.trim();
    email = email.trim();
    
    if (!username || !password || !name || !email || !conf) {
      this.displayError("Necessary Fields *");
      this.errorPassConf = "";
      this.incomplete = true;
      return;
    }

    if(conf != password){
      this.error= "";
      this.displayErrPass("Password confirmation doesn't match");
      return;
    }

    this.incomplete = false;
    this.error= "";
    this.errorPassConf = "";
    this.userService.registerUser(username, password).subscribe(result => {
      console.log(result);
      if(!result.error.length && !result.existsUser){
        this.router.navigate(["/login"]);
      } else if(result.existsUser){
          this.errors = ["There is already a user with that username"];
      } else {
          this.errors= result.error;
      }
    });
  }

  displayError(msg: string): void {
    this.errors = [msg];
  }

  displayErrPass(msg: string): void {
    this.errorPassConf = msg;
  }
}
