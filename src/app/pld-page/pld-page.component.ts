import { Component, OnInit } from '@angular/core';
import { dataentry } from '../models/data/dataentry.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pld-page',
  templateUrl: './pld-page.component.html',
  styleUrls: ['./pld-page.component.css']
})
export class PldPageComponent implements OnInit{
  newdataentry: dataentry = {
    id: '',
    imageurl: 'Random input so that tests work',
    language: '',
    score: 0,
    text: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  addEntry(){
    this.dataService.addDataEntry(this.newdataentry)
    .subscribe({
      next: (newdataentry) => {
        console.log(newdataentry);
      }
    });
  }
}
