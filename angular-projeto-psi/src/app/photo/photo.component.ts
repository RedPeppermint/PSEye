import { Component, Input, OnInit,  HostListener  } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'
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
  liked;
  faved;
  popup="hidden";

  @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if(event.key=="s" || event.key=="S") {
        this.share();
      }
      if(event.key=="l" || event.key=="L") {
        this.like();
      }
      if(event.key=="f" || event.key=="F") {
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
    this.photoService.getPhoto(id).subscribe(p => {
      console.log(p);

      p = p[0];
      this.id = p._id;
      this.user_id = p.user_id;
      var img = new Image();
      img.src = p.photoBase64;
      this.photo = img;
      this.liked = false; //TODO GET FROM BACKEND
      this.faved = false;
      this.description = p.description;
      this.userService.getUserByID(p.user_id).subscribe(user => {
        this.user = user[0].name;
      });
    })
  }

  like(): void {
    console.log("liked");
    if(this.liked) {
      this.liked = false;
      //TODO UNLIKE MAKE function
    } else {
      this.liked = true;
      var loggeduserID = this.userService.getUserId();
      this.photoService.likePhoto(this.id, loggeduserID);
    }
  }

  fave(): void {
    console.log("faved");
    if(this.faved) {
      this.faved = false;
      //TODO UNFAVE MAKE function
    } else {
      this.faved = true;
      var loggeduserID = this.userService.getUserId();
      this.photoService.favouritePhoto(this.id, loggeduserID);
    }
  }

  share(): void {
    this.clipboardService.copy(window.location.hostname.replace("www", "")
      + ":" + location.port + "/photos/" + this.id);



    (async () => {
       // Do something before delay
       this.popup = "visible";

       await this.delay(1500);

       // Do something after
       this.popup = "hidden";

   })();

  }

  delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
