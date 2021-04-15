import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { defaultIfEmpty } from 'rxjs/operators';

import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000/"; //TODO: mudar

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  loginUser(user : string, pass: string): boolean {
    var url = this.url + "users/login" + "?name=" + user + "&password=" + pass;
    var user = this.http.get<User>(url, this.httpOptions).pipe(map(count => count > 0),
    defaultIfEmpty(false),
   tap(_ => "logged in"),
   catchError(_ => {
          return of(false);
      }));

    if(!user) {
      return false;
    }


    return true;
  }

}
