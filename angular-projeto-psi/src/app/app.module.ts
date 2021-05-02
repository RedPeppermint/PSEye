import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ClipboardModule } from 'ngx-clipboard';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { PhotoService } from "./photo.service";
import { UserService } from "./user.service";
import { UserGuard } from './user.guard';
import { FormsModule } from '@angular/forms';
import { PhotoComponent } from './photo/photo.component';
import { PhotopageComponent } from './photopage/photopage.component'

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    ProfileComponent,
    FavoritesComponent,
    PhotoComponent,
    PhotopageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ClipboardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3017', '10.101.151.25:3017'],
        disallowedRoutes: ['localhost:3017/users/login', '10.101.151.25:3017/users/login']
      }
    })
  ],
  providers: [PhotoService, UserService, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
