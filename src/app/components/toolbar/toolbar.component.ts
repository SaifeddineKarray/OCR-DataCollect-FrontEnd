import { Component, OnInit } from '@angular/core';  
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthenticationService } from "../../shared/services/auth.service";
import { User } from 'src/app/shared/services/user';
import { Role } from 'src/app/shared/services/role';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'] ,
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
})
export class ToolbarComponent implements OnInit{
  user?: User | null;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user?.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
    }
  ngOnInit() {
    // this.authService.getUserRole().subscribe((role) => {
    //   this.userRole = role;
    // });
    // this.authService.getUserRole().subscribe((userRole) => {
    //   this.isAdminUser = userRole === 'admin';
    // });
  }    
  }