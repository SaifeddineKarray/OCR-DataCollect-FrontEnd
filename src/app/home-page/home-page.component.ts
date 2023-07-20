import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  // userRole!: string | null;
  constructor(
    public authService: AuthService  ,
  ){}
  ngOnInit() {
    // this.authService.getUserRole().subscribe((role) => {
    //   this.userRole = role;
    // });
  }
}
