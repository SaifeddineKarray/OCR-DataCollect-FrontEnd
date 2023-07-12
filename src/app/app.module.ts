import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PldPageComponent } from './pld-page/pld-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LpdPageComponent } from './lpd-page/lpd-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    HomePageComponent,
    PldPageComponent,
    LandingPageComponent,
    RegisterPageComponent,
    LpdPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarComponent,
    SideNavComponent,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
