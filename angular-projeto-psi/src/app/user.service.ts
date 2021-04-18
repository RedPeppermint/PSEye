import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { defaultIfEmpty } from 'rxjs/operators';

import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000/";

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

  constructor(private http: HttpClient) { }

  loginUser(user: string, pass: string): Observable<any> {
    var url = this.url + "users/login";
    const userObj: User = {
      username: user,
      password: pass
    }
    return this.http.post(url, userObj);
  }

  //if no user, returns undefined
  getUser(): string {
    return sessionStorage.getItem("user");
  }

  setUser(user: string) {
    sessionStorage.setItem("user", user);
  }

}
