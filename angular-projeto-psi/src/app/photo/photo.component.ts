import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})

// TODO: MUDAR. está igual ao dash
export class PhotoComponent implements OnInit {
  title = "PSEye";
  photos = [];
  constructor(private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {
    if (!this.userService.getUser()) {
      this.router.navigate(['/login']);
    }
    this.getPhotos("recent");
  }

  getPhotos(filter): void {
    console.log("Filtro: " + filter);
    this.photos = [];
    if (filter == "recent") {
      this.photoService.getMostRecentPhotos(50).subscribe(photos => {
        photos.forEach(p => {
          var img = new Image();
          img.src = p.photoBase64;
          p.image = img;
          this.photos.push(p);
        })
      });
    } else {
      console.log("Entrou no filter = popular");

      this.photoService.getMostLikedPhotos(50).subscribe(photos => {
        photos.forEach(p => {
          var img = new Image();
          img.src = p.photoBase64;
          p.image = img;
          this.photos.push(p);
        })
      });
    }
  }

}
