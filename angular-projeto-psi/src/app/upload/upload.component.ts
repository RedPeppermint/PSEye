import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  base64: String;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    const file = files.item(0);
    const reader = new FileReader();
    var b = this.base64;
    reader.addEventListener("load", function () {
      b = reader.result.toString();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  log() {
    console.log(this.base64);
  }

}
