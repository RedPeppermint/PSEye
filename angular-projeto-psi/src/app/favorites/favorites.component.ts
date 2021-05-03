import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo.service';
import { UserService } from "../user.service";
import { DeviceDetectorService } from 'ngx-device-detector';
import { NavigationService } from 'src/app/navigation.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  userid = "";
  title = "PSEye";
  photos = [];
  photossize;
  user;
  deviceInfo;
  isMobile;
  isDesktop;

  constructor(private navService: NavigationService, private route: ActivatedRoute, private deviceService: DeviceDetectorService, private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();

    if (!this.userService.getUser()) {
      this.router.navigate(['/login']);
    }

    this.userid = this.userService.getUserId();
    this.userService.getUserByID(this.userid).subscribe(u => {
      this.user = u[0].name;
    });

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
      });

      this.photossize = this.photos.length;
    });
  }


  goToProfile(): void {
    var url = "profile/" + this.userid;
    this.router.navigate([url]);
  }


  toggleSideNav() {
    this.navService.setShowNav(true);
  }
}
