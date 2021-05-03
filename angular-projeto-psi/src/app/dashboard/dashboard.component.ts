import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NavigationService } from 'src/app/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = "PSEye";
  photos = [];
  userid = "";
  deviceInfo;
  isMobile;
  isDesktop;

  constructor(private navService: NavigationService, private deviceService: DeviceDetectorService, private route: ActivatedRoute, private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();

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
          this.userService.getUserByID(p.user_id).subscribe(u => {
            p.user = u[0].name;
          });

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
          this.userService.getUserByID(p.user_id).subscribe(u => {
            p.user = u[0].name;
          });

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

  toggleSideNav() {
    this.navService.setShowNav(true);
  }
}
