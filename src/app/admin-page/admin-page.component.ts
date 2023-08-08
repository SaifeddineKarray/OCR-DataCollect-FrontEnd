import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../shared/services/user';
import { UserService } from '../shared/services/user.service';
import { DataService } from '../services/data.service';
import { dataentry } from '../models/data/dataentry.model';

@Component({ templateUrl: 'admin-page.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];

    constructor(private userService: UserService, private dataService: DataService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        this.dataService.getAllEntries()
        .subscribe({
            next: (dataentries) => {
                console.log(dataentries);
            },
            error: (response) => {
                console.log(response);
            }
        })
    }
}
