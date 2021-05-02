import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";


import { DashboardComponent } from "./dashboard/dashboard.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UploadComponent } from "./upload/upload.component";
import { ProfileComponent } from "./profile/profile.component";
import { UserGuard } from './user.guard';
import { PhotoComponent } from './photo/photo.component';
import { PhotopageComponent } from './photopage/photopage.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },//todo - ir para dashboard, fazer verificacao se ha user autenticado
  { path: "dashboard", component: DashboardComponent, canActivate: [UserGuard] },
  { path: "favorites", component: FavoritesComponent, canActivate: [UserGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile/:id", component: ProfileComponent, canActivate: [UserGuard] },
  { path: "photos/:id", component: PhotopageComponent, canActivate: [UserGuard] },
  { path: "upload", component: UploadComponent, canActivate: [UserGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
