import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminComponent } from './admin-page/admin-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LpdPageComponent } from './lpd-page/lpd-page.component';
import { PldPageComponent } from './pld-page/pld-page.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { Role } from './shared/services/role';
const routes: Routes = [
  {
    path:'',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'providelableddata',
    component:PldPageComponent,
    canActivate: [AuthGuard]
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
    component:LpdPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'admin',
    component:AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
