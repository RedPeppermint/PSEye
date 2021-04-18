import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Photo } from "./photo";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private url = "http://localhost:3000/photos";


  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }


  getMostLikedPhotos(int: number): Observable<Photo[]> {
    return this.http
      .request<Photo[]>("GET", this.url,
        {
          body: '[{"filter": "likes", "number_of_results": "' + int.toString() + '"}]',
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
  }


  getMostRecentPhotos(int: number): Observable<Photo[]> {
    return this.http
      .request<Photo[]>("GET", this.url,
        {
          body: '[{"filter": "posted_at", "number_of_results": "' + int.toString() + '"}]',
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
  }


}
