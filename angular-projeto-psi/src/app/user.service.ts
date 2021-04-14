import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000/login"; //TODO: mudar

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}


  loginUser(user : User): Observable<any> {
    var url = this.url + "users/login" + "?name=" + user.username + "&password=" + user.password;
     return this.http.get<User>(url, user, this.httpOptions).pipe(
      tap(_ => "logged in")
    );
  }

}
