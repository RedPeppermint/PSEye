import { Component, OnInit} from '@angular/core';
import { UserService } from "../user.service";
import { PhotoService } from '../photo.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-photopage',
  templateUrl: './photopage.component.html',
  styleUrls: ['./photopage.component.css']
})
export class PhotopageComponent implements OnInit {
  id;
  user;
  user_id;
  photo;
  description;
  liked;
  faved;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
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

}
