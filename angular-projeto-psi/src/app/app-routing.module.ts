import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";


import { DashboardComponent } from "./dashboard/dashboard.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UploadComponent } from "./upload/upload.component";
import { ProfileComponent } from "./profile/profile.component";


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },//todo - ir para dashboard, fazer verificacao se ha user autenticado
  { path: "dashboard", component: DashboardComponent },
  { path: "favorites", component: FavoritesComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "upload", component: UploadComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
