import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "PSEye";
  photos = [];
  user;
  constructor(private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {
    if (!this.userService.getUser()) {
      this.router.navigate(['/login']);
    }

    this.user = this.userService.getUser();

    // this.getPhotosById(this.user._id);
  }

  // getPhotosById(id: number): void {
  //   this.photoService.getPhotosById().subscribe(photos => {
  //     photos.forEach(p => {
  //       var img = new Image();
  //       img.src = p.photoBase64;
  //       p.image = img;
  //       this.photos.push(p);
  //     })
  //   });
  // }
  // }
}
