import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../dragDrop.directive';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  title = "PSEye";
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  
  name = 'Angular 5';
  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  upload(): void {
    //get image upload file obj;
  }




    names = [];
    descrip = [];
    removeName(i){
      this.names.splice(i,1);
    }

    removeDescription(i){
      this.descrip.splice(i,1);
    }


    addName(){
      this.names.push({value: "name"});
    }

    addDescription(){
      this.descrip.push({value: "description"});
    }


  constructor() {
  }
  ngOnInit() {
  }

  urls=[];
  onselect(e){
    if (e.target.files) {
      for (let i = 0; i < File.length; i++) {
        var reader = new FileReader();

        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(events:any)=>{
          this.urls.push(events.target.result);
        }
      }
    }
  }
}
