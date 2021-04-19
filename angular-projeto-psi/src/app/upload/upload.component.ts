import { Component, OnInit } from '@angular/core';
import { PhotoService } from "../photo.service";
import { UserService } from "../user.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  title = "PSEye";
  base64: string;

  constructor(private photoService: PhotoService, private userService: UserService) { }

  ngOnInit(): void {

  }

  handleFileInput(files: any, description: string) {
    const file = (files as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result as string;
      this.photoService.uploadPhoto(description,this.base64,this.userService.getUserId()).subscribe(); 
    }
  }

  log() {
    console.log(this.base64);
  }

}
