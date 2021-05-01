import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = "PSEye";
  photos = [];
  userid = ""
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {
    if (!this.userService.getUser()) {
      this.router.navigate(['/login']);
    }

    this.userid = this.userService.getUserId();
    this.getPhotos("recent");
    console.log(this.userid);

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

  goToProfile(): void {
    var url = "profile/" + this.userid;
    this.router.navigate([url]);
  }

}
