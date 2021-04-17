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
    var ze = this.http.get(url, this.httpOptions).subscribe(data => {
      console.log(data.response);
    });


    return true;
  }

}
