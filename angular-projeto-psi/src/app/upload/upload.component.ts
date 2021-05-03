import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { UploadPhoto } from '../uploadPhoto';
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

  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {
  }

  check() {
    for (let i = 0; i < this.photos.length; i++) {
      const photo = this.photos[i];
      if (!photo.name || !photo.description || photo.name.length > 100 || photo.description.length > 500)
        return false;
    }
    return true;
  }

  onselect(e) {
    if (e.target.files) {
      let fileToUpload = e.target.files;
      for (let i = 0; i < fileToUpload.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(fileToUpload[i]);
        reader.onload = (events: any) => {
          this.photos.push({ base64: events.target.result, name: "", description: "" });
        }
      }
    }
  }


  upload(): void {
    if (this.check()) {
      this.photoService.uploadPhoto(this.photos).subscribe(res => {
        console.log(res);
        if (!res.INFO) {
          this.error = "Erro ao enviar fotos para o servidor, por favor contacte um administrador.";
        }
        else {
          window.location.reload();
        }
      }, error => {
        this.error = "Erro ao enviar fotos para o servidor, por favor contacte um administrador.";
      })
    }
    else {
      this.error = "Erro! Não cumpriu os requisitos do nome (100 caracteres) e da descrição(500 caracteres).";
    }
  }


}
