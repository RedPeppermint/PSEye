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
  @Input() user_id: string
  @Input() photo: HTMLImageElement;
  @Input() description: string;
  liked;
  faved;
  popup="hidden";

  @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if(event.key=="s") {
        this.share();
      }
      if(event.key=="l") {
        this.like();
      }
      if(event.key=="f") {
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
      p = p[0];
      this.id = p._id;
      this.user_id = p.user_id;
      var img = new Image();
      img.src = p.photoBase64;
      this.photo = img;
      this.liked = false;
      this.faved = true;
      this.description = p.description;
      this.userService.getUserByID(p.user_id).subscribe(user => {
        this.user = user[0].name;
      });
    })
  }

  like(): void {
    console.log("liked");

  }

  fave(): void {
    console.log("faved");
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
