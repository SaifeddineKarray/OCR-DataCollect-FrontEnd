import { Component, OnInit } from '@angular/core';  
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from "../../shared/services/auth.service";
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
  // userRole!: string | null;
  isAdminUser: boolean = false;
  constructor(
    public authService: AuthService  ,
  ){}
  ngOnInit() {
    // this.authService.getUserRole().subscribe((role) => {
    //   this.userRole = role;
    // });
    // this.authService.getUserRole().subscribe((userRole) => {
    //   this.isAdminUser = userRole === 'admin';
    // });
  }    
  }