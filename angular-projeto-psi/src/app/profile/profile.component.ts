import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NavigationService } from 'src/app/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "PSEye";
  photos = [];
  photossize;
  user;
  id;
  deviceInfo;
  isMobile;
  isDesktop;

  constructor(private navService: NavigationService, private deviceService: DeviceDetectorService, private userService: UserService, private router: Router, private route: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();


    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserByID(this.id).subscribe(u => {
      this.user = u[0].name;
      console.log(this.user);
    });

    this.getPhotosById(this.id);
  }

  getPhotosById(id: number): void {

    this.photoService.getPhotosById(this.id).subscribe(photos => {
      photos.forEach(p => {
        var img = new Image();
        img.src = p.photoBase64;
        p.image = img;
        this.photos.push(p);
      });
      this.photossize = this.photos.length;
      // console.log(this.photossize);


    });

  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }
}
