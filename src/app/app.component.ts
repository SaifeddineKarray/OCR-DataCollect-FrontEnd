import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/auth.service';
import { User } from './shared/services/user';
import { Role } from './shared/services/role';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OCR-DataCollect';
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
}
