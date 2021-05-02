import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
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
  constructor(/*private clipboardService: ClipboardService,*/ private userService: UserService, private router: Router, private route: ActivatedRoute, private photoService: PhotoService) { }

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
      this.description = p.description;
      this.userService.getUserByID(p.user_id).subscribe(user => {
        this.user = user[0].name;
      });
    })
  }

  share(): void {
    ///
    // INSERT INTERFACE HTML AND CSS LOGIC 
    /// 
    
    this.clipboardService.copy(window.location.hostname.replace("www", "")
      + ":" + location.port + "/photos/" + this.id);
    console.log("Copied to linkboard")
  }

}
