import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../shared/services/user';
import { dataentry } from '../models/data/dataentry.model';
import { UserService } from '../shared/services/user.service';
import { DataService } from '../services/data.service';
import { EditSettingsModel,GridComponent,IEditCell,RowSelectEventArgs,ToolbarItems } from '@syncfusion/ej2-angular-grids/src';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({ templateUrl: 'admin-page.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];
    dataentries: dataentry[] = [];
    public editOptions: EditSettingsModel = {allowAdding: true, allowEditing:true, allowDeleting:true, mode:'Normal'};
    public toolbarOptions: ToolbarItems[] = ['Edit', 'Delete', 'Update', 'Cancel'];
    public toolbarOptions1: ToolbarItems[] = ['Add','Edit', 'Delete', 'Update', 'Cancel'];
    public selectedrecords: User [] = [];
    public selecteddata: dataentry[] = [];
    updatepressed: boolean = false;
    updatepressed1: boolean = false;
    public dropdownFields: Object = { text: 'text', value: 'value' };

    constructor(private userService: UserService, private dataService: DataService) { }

    @ViewChild('grid')
    public grid?: GridComponent;

    @ViewChild('grid1')
    public grid1?: GridComponent;

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
            console.log(users);
        });
        this.dataService.getAllEntries()
        .subscribe({
            next: (dataentries) => {
                this.dataentries = dataentries;
                console.log(dataentries);
            },
            error: (response) => {
                console.log(response);
            }
        })
    }

    editItem(user: User){}

    deleteItem(user: User){
        this.userService.deleteUserById(user.id).subscribe({
            next:(x=>{
                this.userService.getAll().pipe(first()).subscribe(users => {
                    this.loading = false;
                    this.users = users;
                });
            })
        })
    }

    clickHandler(args: ClickEventArgs): void {
        console.log(args.item.id);
        if (args.item.id == "grid_667954601_0_delete"){
            this.userService.deleteUserById(this.selectedrecords[0].id).subscribe({
                next:(x=>{
                    this.userService.getAll().pipe(first()).subscribe(users => {
                        this.loading = false;
                        this.users = users;
                    });
                })
            });
        }
        if (args.item.id == "grid_667954601_0_update"){
            console.log(this.selectedrecords[0]);
            this.updatepressed = true;
        }
    }

    
    rowSelected(args: RowSelectEventArgs){
        this.selectedrecords = (this.grid as any).getSelectedRecords();
        console.log(this.selectedrecords[0].username);
        if (this.updatepressed == true){ 
            this.userService.updateUser(this.selectedrecords[0]).subscribe({
                next:(x=>{
                    this.userService.getAll().pipe(first()).subscribe(users => {
                        this.loading = false;
                        this.users = users;
                    });
                })
            });
            this.updatepressed = false;
        }
    }

    clickHandler1(args: ClickEventArgs){
        console.log(args.item.id);
        if (args.item.id == "grid_667954601_1_delete"){
            this.dataService.deleteByID(this.selecteddata[0].id).subscribe({
                next:(x=>{
                    this.dataService.getAllEntries()
                    .subscribe({
                        next: (dataentries) => {
                            this.dataentries = dataentries;
                            console.log(dataentries);
                        },
                        error: (response) => {
                            console.log(response);
                        }
                    })
                })
            })
        }
        if (args.item.id == "grid_667954601_1_update"){
            console.log(this.selecteddata[0]);
            this.updatepressed1 = true;
            console.log(this.updatepressed1);
        }
    }

    rowSelected1(args: RowSelectEventArgs){
        this.selecteddata = (this.grid1 as any).getSelectedRecords();
        if (this.updatepressed1 == true){ 
            this.dataService.updateEntry(this.selecteddata[0].id, this.selecteddata[0]).subscribe({
                next:(x=>{
                    this.dataService.getAllEntries()
                    .subscribe({
                        next: (dataentries) => {
                            this.dataentries = dataentries;
                            console.log(dataentries);
                        },
                        error: (response) => {
                            console.log(response);
                        }
                    })
                })
            })
            this.updatepressed1 = false;
        }
    }
}
