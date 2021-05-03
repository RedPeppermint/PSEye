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
  // private url = "http://10.101.151.25:3017/photos";
  private url = "http://localhost:3017/photos";


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

  uploadPhoto(description: Array<string>, photosBase64: Array<string>): Observable<any> {
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    interface response {
      description: string,
      photoBase64: string,
    }
    var naoEhMerda: Array<response> = [];
    for (var i = 0; i < description.length; i++) {
      var newRes: response = {
        description: description[i],
        photoBase64: photosBase64[i]
      }
      naoEhMerda.push(newRes);
    }
    console.log("naoEhMerda: " + naoEhMerda);
    var res = { photos: naoEhMerda };
    console.log("res: " + res);
    return this.http.post<{ Error: String, photo: Photo }>(this.url, res);

  }

  getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(this.url + "/" + id);
  }

  isLiked(id: string): Observable<any>{
    return this.http.get<{ Error: String }>(this.url + "/status" + "?id=" + id + "&action=like");
  }

  isFav(id: string): Observable<any>{
    return this.http.get<{ Error: String }>(this.url + "/status" + "?id=" + id + "&action=favourite");
  }

  likePhoto(id: string, user_id: string): Observable<any> {
    interface response {
      action: string,
      user_id: string
    }
    const res: response = {
      action: "like",
      user_id: user_id
    }

    console.log(this.url +"/" +id);

    return this.http.put<{ Error: String }>(this.url + "/" + id, res);
  }

  unlikePhoto(id: string, user_id: string): Observable<any> {
    interface response {
      action: string,
      user_id: string
    }
    const res: response = {
      action: "dislike",
      user_id: user_id
    }

    console.log(this.url +"/" +id);

    return this.http.put<{ Error: String }>(this.url + "/" + id, res);
  }



  favouritePhoto(id: string, user_id: string): Observable<any> {
    interface response {
      action: string,
      user_id: string
    }
    const res: response = {
      action: "favourite",
      user_id: user_id
    }
    return this.http.put<{ Error: String }>(this.url + "/" + id, res);
  }

  unfavouritePhoto(id: string, user_id: string): Observable<any> {
    interface response {
      action: string,
      user_id: string
    }
    const res: response = {
      action: "unfavourite",
      user_id: user_id
    }
    return this.http.put<{ Error: String }>(this.url + "/" + id, res);
  }

  getFavourites(user_id: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url + "/favourites/" + user_id);
  }
}
