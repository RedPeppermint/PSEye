import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "PSEye";
  photos = [];
  user;
  profile;
  id;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
    if (!this.userService.getUser()) {
      this.router.navigate(['/login']);
    }

    this.user = this.userService.getUser();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    // this.profile = this.userService.getUserById(this.id).subscribe();

    this.getPhotosById(this.id);
  }

  getPhotosById(id: number): void {
    this.photoService.getPhotosById(this.id).subscribe(photos => {
      photos.forEach(p => {
        var img = new Image();
        img.src = p.photoBase64;
        p.image = img;
        this.photos.push(p);
      })
    });
  }

}
