import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PldPageComponent } from './pld-page/pld-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LpdPageComponent } from './lpd-page/lpd-page.component';
import { environment } from '../environments/environment';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './shared/guard/fake-backend';
import { JwtInterceptor } from './shared/guard/jwt.interceptor';
import { ErrorInterceptor } from './shared/guard/error.interceptor';
import { AdminComponent } from './admin-page/admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { GridModule, PagerModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PldPageComponent,
    LandingPageComponent,
    RegisterPageComponent,
    LpdPageComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarComponent,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AgGridModule,
    GridModule,
    PagerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    EditService,
    ToolbarService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
