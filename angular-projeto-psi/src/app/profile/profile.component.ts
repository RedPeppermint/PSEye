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
  pop = false;
  ph;
  popup = "hidden";

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

  logout() {
    this.userService.logout();
  }
  
  getPhotosById(id: string): void {
    this.photoService.getPhotosById(this.id).subscribe(photos => {
      photos.forEach(p => {
        var img = new Image();
        img.src = p.photoBase64;
        p.user = this.user;

        this.photoService.isLiked(p._id).subscribe(b => {
          p.liked = b.Response;
        });

        this.photoService.isFav(p._id).subscribe(b => {
          p.faved = b.Response;
        });

        p.number_of_likes = p.likes.length;
        p.image = img;
        this.photos.push(p);

      });
      this.photossize = this.photos.length;

    });

  }

  delete_popup_open(){
    this.popup = "visible";
  }

  delete_popup_close(){
    this.popup = "hidden";
  }

  delete_photo(id: string) {

    this.photoService.deletePhoto(id).subscribe(res => {
      if (res.Error) {
        console.log("Error deleting photo: " + Error);
      } else if (res.INFO === "Photo deleted") {
        this.photos = this.photos.filter(x => x._id != id);
        this.close();
      }
      else {
        console.log("Error deleting photo: something went wrong");
      }
    });
  }


  toggleSideNav() {
    this.navService.setShowNav(true);
  }

  close() {
    this.ph = null;
    this.pop = false;
    this.delete_popup_close();
  }

}
