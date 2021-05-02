import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from "../photo.service";
import { UserService } from "../user.service";
import {NgModule} from '@angular/core';
import { User } from "../user";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
	title = "PSEye";
	images: Array<string> = []; 
	descriptions: Array<string> = [];
	tempD: string;
	temptempD: string;

	constructor(private photoService: PhotoService, private userService: UserService) { }

	ngOnInit(): void {

	}

	handleFileInput(event) {
		if(event.target.files && event.target.files[0]){
			var filesAmount = event.target.files.length;
			for (let i = 0; i < filesAmount; i++) {
				const reader = new FileReader();
				reader.onload = () => {
					var base64 = reader.result as string;
					this.images.push(base64);
					this.temptempD = event.target.files[i].name;
				}	
				reader.readAsDataURL(event.target.files[i]);
			}
		}
	}

  submit() {
	if(this.tempD){
		console.log(this.tempD);
		this.descriptions.push(this.tempD);
		this.tempD = "";
	} else {
		this.descriptions.push(this.temptempD);
	}
	console.log(this.descriptions);
	this.photoService.uploadPhoto(this.descriptions,this.images).subscribe(); 
	this.images = [];
  }

}
