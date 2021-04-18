import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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


  getMostLikedPhotos(number: number): Observable<Photo[]> {
    let params = new HttpParams().set('filter', 'likes').set('number_of_results', number.toString());

    return this.http
      .request<Photo[]>("GET", this.url, { params: params });
  }


  getMostRecentPhotos(number: number): Observable<Photo[]> {
    let params = new HttpParams().set('filter', 'posted_at').set('number_of_results', number.toString());

    return this.http
      .request<Photo[]>("GET", this.url, { params: params });
  }

  getPhotosById(number: number): Observable<Photo[]> {
    let params = new HttpParams().set('_id', number.toString());

    return this.http.request<Photo[]>("GET", this.url, { params: params });
  }

}
