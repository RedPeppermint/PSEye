import { Component, OnInit } from '@angular/core';

import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = "PSEye";
  error = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    username = username.trim();
    if (!username || !password) {
      this.error = "Campos obrigatórios";
      return;
    }
/*
    if(this.userService.getUser(username, password)) {

    } else {
      displayError();
    }*/
  }
/*
  displayError(): void {
    this.error = "Username ou password errados";

  }
*/
}
