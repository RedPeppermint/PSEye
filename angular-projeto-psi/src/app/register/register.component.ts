import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { Router } from '@angular/router';
import { UserService } from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public frmSignup: FormGroup;
  public frmSignin: FormGroup;
  public userExists: boolean;
  public authenticated: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.frmSignup = this.createSignupForm();
    this.frmSignin = this.createSigninForm();
    this.authenticated = true;
    this.userExists = false;
    this.ngOnInit;
  }


  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        usernameRegister: [
          null,
          Validators.compose([
            CustomValidators.patternValidator(/^([a-zA-Z0-9áéíóúãõç]+)$/, { hasSymbol: true }),
            Validators.minLength(3),
            Validators.required
          ])
        ],
        email: [null, Validators.compose([
          ])
        ],
        passwordRegister: [
          null,
          Validators.compose([
            Validators.required,
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }

    );
  }


  createSigninForm(): FormGroup {
    return this.fb.group(
      {
        username: [null, Validators.compose([Validators.required])],
        password: [null, Validators.compose([Validators.required])]
      }
    );
  }


  ngOnInit(): void {

    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }


  submitRegister() {
    console.log("REGISTER COMPONENT");
    this.userExists = false;
    this.userService.registerUser(this.frmSignup.value.usernameRegister, this.frmSignup.value.passwordRegister).subscribe(result => {
      console.log(result);
      if (result.error.length != 0) {
        //deu erro
        console.log(result.error);
        this.displayError('Error: ' + result.error);
      }
      else if (result.existsUser) {
        //user já existe
        console.log("user exists");
        this.displayError('This username already exists');
        this.userExists = true;
      }
      else {
        //user nao existe
        console.log("Register")
        if (!result.token || !result.model) {
          this.displayError('Could not authenticate');
        }
        else {
          sessionStorage.setItem("access_token", result.token);
          sessionStorage.setItem("user", result.model);
          var id = this.userService.getUserId();
          var url = "profile/" + id;
          this.router.navigate([url]);
        }
      }
    });
  }


  error = "";
  incomplete = false;

  submitLogin(): void {
    this.authenticated = true;
    console.log(this.authenticated)
    var username = this.frmSignin.value.username;
    var password = this.frmSignin.value.password;
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
          console.log(this.authenticated)
          this.displayError('Could not authenticate');
          this.authenticated = false;
        }
        else {
          sessionStorage.setItem("access_token", result.token);
          sessionStorage.setItem("user", result.model);
          var id = this.userService.getUserId();
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
