import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'] ,
  standalone: true,
  imports: [NgIf, MatSidenavModule],
})
export class SideNavComponent {

}
