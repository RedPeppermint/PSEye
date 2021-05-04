import { Component, OnInit, HostListener } from '@angular/core';
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
  pop = false;
  ph;
  recent = true;

  @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if(event.key=="r" || event.key=="R") {
        this.recent = true;
      }
      if(event.key=="p" || event.key=="P") {
        this.recent = false;
      }
      this.getPhotos();

    }

  constructor(private navService: NavigationService, private deviceService: DeviceDetectorService, private route: ActivatedRoute, private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();

    this.userid = this.userService.getUserId();
    this.getPhotos();

  }


  logout() {
    this.userService.logout();
  }
  
  getPhotos(): void {
    this.photos = [];
    if (this.recent) {
      this.photoService.getMostRecentPhotos(50).subscribe(photos => {
        photos.forEach(p => {

          var img = new Image();
          img.src = p.photoBase64;
          this.userService.getUserByID(p.user_id).subscribe(u => {
            p.user = u[0].name;
          });

          this.photoService.isLiked(p._id).subscribe(b => {
              p.liked = b.Response;
          });

          this.photoService.isFav(p._id).subscribe(b => {
            p.faved = b.Response;
          });

          p.number_of_likes = p.likes.length;
          p.image = img;
          this.photos.push(p);
        })
      });
    } else {

      this.photoService.getMostLikedPhotos(50).subscribe(photos => {
        photos.forEach(p => {
          var img = new Image();
          img.src = p.photoBase64;
          this.userService.getUserByID(p.user_id).subscribe(u => {
            p.user = u[0].name;
          });

          this.photoService.isLiked(p._id).subscribe(b => {
              p.liked = b.Response;
          });

          this.photoService.isFav(p._id).subscribe(b => {
            p.faved = b.Response;
          });

          p.number_of_likes = p.likes.length;
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

  close() {
    this.ph = null;
    this.pop = false;
  }
}
