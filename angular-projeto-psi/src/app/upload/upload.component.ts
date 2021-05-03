import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../dragDrop.directive';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  title = "PSEye";
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File[] = null;
  names = [];
  descrip = [];
  urls = [];
  base64 = [];
  srcs =[];
  error= "";
  name;
  des;
  base64;
  url;
  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {

  }

  onselect(e) {
    if (e.target.files) {
      this.fileToUpload = e.target.files;
      for (let i = 0; i < this.fileToUpload.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (events: any) => {
          this.urls.push(events.target.result);
        }
      }
    }
  }


  upload(): void {
    if (!this.error) {
      this.changeNames();

      for (let i = 0; i < this.urls.length; i++) {
        if (!this.names[i]) {
          this.names[i] = this.srcs[i];
        }
        if (!this.descrip[i]) {
          this.error = "meter description";
        } else{

            // this.photoService.uploadPhoto(this.names, this.descrip, this.urls).subscribe( res => {
            //   if(res.Error) {
            //     this.error = res.Error;
            //   } else {
            //     console.log("yupi");
            //
            //   }
            // });

        }
      }
    }
  }

  changeNames() {
    this.names = this.names[0];
    for (let i = 0; i < this.names.length; i++) {
      this.names[i] = this.names.value;

    }
    console.log(this.names);

  }

  changeNames() {
    this.descrip = this.descrip[0];
    for (let i = 0; i < this.descrip.length; i++) {
      this.descrip[i] = this.descrip.value;

    }
    console.log(this.descrip);

  }

  removeName(i) {
    this.names.splice(i, 1);
  }

  removeDescription(i) {
    this.descrip.splice(i, 1);
  }

  addName() {
    this.names.push({ value: "name" });
  }

  addSource() {
    this.srcs.push({ value: "source" });
  }

  addDescription() {
    this.descrip.push({ value: "description" });
  }


}
