import { Component, Input, OnInit, HostListener } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Photo } from "../photo";
import { ClipboardService } from 'ngx-clipboard';



@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})


export class PhotoComponent implements OnInit {
  @Input() id: string;
  @Input() user: string;
  @Input() user_id: string;
  @Input() photo: HTMLImageElement;
  @Input() description: string;
  @Input() name: string;
  @Input() number_of_likes: number;
  @Input() liked: boolean;
  @Input() faved: boolean;
  @Input() dashboard: boolean;

  popup = "hidden";

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "s" || event.key == "S") {
      this.share();
    }
    if (event.key == "l" || event.key == "L") {
      this.like();
    }
    if (event.key == "f" || event.key == "F") {
      this.fave();
    }
  }

  constructor(private clipboardService: ClipboardService, private userService: UserService, private router: Router, private route: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.userService.getUserByID(this.user_id).subscribe(user => {
        this.user = user[0].name;
      });
      return;
    }
    this.photoService.getPhoto(this.id).subscribe(p => {
      p = p[0];
      this.id = p._id;
      this.user_id = p.user_id;
      var img = new Image();
      img.src = p.photoBase64;
      this.photo = img;
      this.number_of_likes = p.likes.length;
      this.name = p.name;

      this.photoService.isLiked(p._id).subscribe(b => {
        console.log(b.Response);

        this.liked = b.Response;
      });

      this.photoService.isFav(p._id).subscribe(b => {
        this.faved = b.Response;
      });

      this.faved = p.faved;

      this.description = p.description;
      this.userService.getUserByID(p.user_id).subscribe(user => {
        this.user = user[0].name;
      });
    })
  }

  like(): void {

    if (this.liked) {
      this.liked = false;
      this.number_of_likes -= 1;
      var loggeduserID = this.userService.getUserId();
      this.photoService.unlikePhoto(this.id, loggeduserID).subscribe();

    } else {
      this.liked = true;
      this.number_of_likes += 1;
      var loggeduserID = this.userService.getUserId();
      this.photoService.likePhoto(this.id, loggeduserID).subscribe();
    }
    //
    // this.photoService.isLiked(this.id).subscribe(b => {
    //   this.liked = b.Response;
    // });
  }

  fave(): void {
    if (this.faved) {
      this.faved = false;
      var loggeduserID = this.userService.getUserId();
      this.photoService.unfavouritePhoto(this.id, loggeduserID).subscribe();

    } else {
      this.faved = true;
      var loggeduserID = this.userService.getUserId();
      this.photoService.favouritePhoto(this.id, loggeduserID).subscribe();
    }

    // this.photoService.isFav(this.id).subscribe(b => {
    //   this.faved = b.Response;
    // });
  }

  share(): void {

    this.clipboardService.copy(window.location.hostname.replace("www", "")
      + ":" + location.port + "/photos/" + this.id);

    (async () => {
      this.popup = "visible";

      await this.delay(1500);

      this.popup = "hidden";
    })();

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
