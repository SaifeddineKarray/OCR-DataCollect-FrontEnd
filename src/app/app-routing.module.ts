import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path:'',
    component: HomePageComponent
  },
  {
    path:'providelableddata',
    component:ImageUploadComponent
  },
  {
    path:'login',
    component:LandingPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
