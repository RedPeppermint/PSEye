import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = "PSEye";
  error = "";
  incomplete = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.getUser()) {
      this.router.navigate(["/dashboard"]);
    }
  }


  register(name: string, email: string, username: string, password: string): void {
    username = username.trim();
    email = email.trim();
    if (!username || !password || !name || !email) {
      this.displayError("Campos obrigatórios *");
      this.incomplete = true;
      return;
    }

    this.incomplete = false;
    this.userService.loginUser(username, password).pipe(first())
      .subscribe(
        result => {
          this.router.navigate(["/dashboard"])
        },
        err => this.displayError('Could not authenticate')
      );;
  }
  displayError(msg: string): void {
    this.error = msg;
  }
}
