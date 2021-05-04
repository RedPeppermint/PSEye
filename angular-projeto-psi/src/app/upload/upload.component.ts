import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { UploadPhoto } from '../uploadPhoto';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  title = "PSEye";
  imageUrl: string = "/assets/img/default-image.png";
  error = null;
  photos: UploadPhoto[] = []
  askConfirm = false;
  constructor(private photoService: PhotoService, private router: Router) {
  }

  ngOnInit() {
  }

  check() {
    for (let i = 0; i < this.photos.length; i++) {
      const photo = this.photos[i];
      console.log(photo);
      if(!this.askConfirm && !photo.description){
        this.askConfirm = true;
      }
      if (!photo.name || photo.name.length > 100 || photo.description.length > 500)
        return false;
    }
    return true;
  }

  async getReaderResult(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event:any) => {
    resolve(event.target.result)
    }
  }
  )}





  async onselect(e) {
    if (e.target.files) {
      let fileToUpload = e.target.files;
      for (let i = 0; i < fileToUpload.length; i++) {


        var base64 = await this.getReaderResult(fileToUpload[i]);

        this.photos.push({photoBase64:base64, name: fileToUpload[i].name, description:""});

      }
      e.srcElement.value = null;
    }
  }


  upload(): void {
    if (this.check()) {
      if(this.askConfirm){
        if(!confirm("You confirm that you do not want to post any description")) {
          return;
        }
      }
    this.photoService.uploadPhoto(this.photos).subscribe(res => {
      console.log(res);
      if (!res.INFO) {
        this.error = "Erro ao enviar fotos para o servidor, por favor contacte um administrador.";
      }
      else {
        this.router.navigate(["/dashboard"]);

      }
    }, error => {
      this.error = "Erro ao enviar fotos para o servidor, por favor contacte um administrador.";
    })

      }
    else {
      this.error = "Erro! Não cumpriu os requisitos do nome (100 caracteres) e da descrição(500 caracteres).";
  }
}
  removeIndex(index): void {
    this.photos.splice(index, 1);
  }


}
