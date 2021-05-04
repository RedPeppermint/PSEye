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
  name;
  number_of_likes;



  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (!this.id) {
      this.userService.getUserByID(this.user_id).subscribe(user => {
        this.user = user[0].name;
      });
      return;
    }

    this.photoService.getPhoto(this.id).subscribe(p => {
      p = p[0];

      this.user_id = p.user_id;
      var img = new Image();
      img.src = p.photoBase64;
      this.photo = img;
      this.name = p.name;

      this.photoService.isLiked(p._id).subscribe(b => {
        this.liked = b.Response;
      });

      this.photoService.isFav(p._id).subscribe(b => {
        this.faved = b.Response;
      });

      this.description = p.description;
      p.number_of_likes = p.likes.length;

      this.userService.getUserByID(p.user_id).subscribe(user => {
        this.user = user[0].name;
      });

    });


  }

  logout() {
    this.userService.logout();
  }

}
