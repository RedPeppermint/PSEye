import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo.service';
import { UserService } from "../user.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  userid = "";
  title = "PSEye";
  photos = [];
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {
    if (!this.userService.getUser()) {
      this.router.navigate(['/login']);
    }

    this.userid = this.userService.getUserId();
    this.getFavourites();
    console.log(this.userid);
  }

  getFavourites() {
    this.photos = [];
    this.photoService.getFavourites(this.userid).subscribe(photos => {
      photos.forEach(p => {
        var img = new Image();
        img.src = p.photoBase64;
        this.userService.getUserByID(p.user_id).subscribe(u => {
          p.user = u[0].name;
        });

        p.image = img;
        this.photos.push(p);
      })
    });
  }
}