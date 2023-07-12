import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LpdPageComponent } from './lpd-page/lpd-page.component';
import { PldPageComponent } from './pld-page/pld-page.component';

const routes: Routes = [
  {
    path:'',
    component: HomePageComponent
  },
  {
    path:'providelableddata',
    component:PldPageComponent
  },
  {
    path:'login',
    component:LandingPageComponent
  },
  {
    path:'register',
    component:RegisterPageComponent
  },
  {
    path:'labelprovideddata',
    component:LpdPageComponent
  },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
