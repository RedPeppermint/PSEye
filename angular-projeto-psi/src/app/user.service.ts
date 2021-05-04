import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { defaultIfEmpty } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private url = "http://10.101.151.25:3017/";
  private url = "http://localhost:3017/";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user: string, pass: string): Observable<{ token: string, model: string }> {
    var url = this.url + "users/login";
    const userObj: User = {
      username: user,
      password: pass
    }

    return this.http.post<{ token: string, model: string }>(url, userObj);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(["/register"]);
  }

  registerUser(user: string, pass: string): Observable<any> {
    var url = this.url + "users/register";
    console.log("REGISTER USER SERVICE");
    const userObj: User = {
      username: user,
      password: pass
    }
    return this.http.post<{ error: Array<String>, existsUser: boolean }>(url, userObj);
  }

  getUserByID(id: string): Observable<User> {
    return this.http.get<User>(this.url + "users/" + id);
  }

  //if no user, returns undefined
  getUser(): string {
    return sessionStorage.getItem("access_token");
  }

  getUserId(): string {
    return JSON.parse(sessionStorage.getItem("user"))._id;
  }

  getUsername(): string {
    return this.getUserByID(this.getUserId()).subscribe.name;
  }

  setUser(user: string) {
    sessionStorage.setItem("access_token", user);
  }

  public get loggedIn(): boolean {
    return (sessionStorage.getItem('access_token') !== null);
  }



}
