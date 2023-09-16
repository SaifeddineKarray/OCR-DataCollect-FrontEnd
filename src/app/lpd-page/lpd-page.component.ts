import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { dataentry } from '../models/data/dataentry.model';

@Component({
  selector: 'app-lpd-page',
  templateUrl: './lpd-page.component.html',
  styleUrls: ['./lpd-page.component.css']
})
export class LpdPageComponent implements OnInit{
  newForm: FormGroup;
  uploadForm: FormGroup;
  submitted = false;
  error = '';
  display: boolean = false;
  image: string = '';
  imagetext = '';
  imageURL = '';
  newdataentry: dataentry = {
    id: '',
    imageurl: 'test',
    language: '',
    score: 0,
    text: '',
  };

  constructor(private dataService: DataService, public fb: FormBuilder) {
    this.newForm = this.fb.group({
      file: ['', Validators.required],
      fileSource: ['', Validators.required]
    })
    this.uploadForm = this.fb.group({})
  }

  ngOnInit(): void {}

  get f() { return this.newForm.controls; }
  
  get g() { return this.uploadForm.controls; }

  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newForm.patchValue({
        fileSource: file
      });
    }
  }

  imagesubmitted(){
    const formData = new FormData();

    formData.append('file', this.newForm.get('fileSource')?.value);

    this.dataService.extractText(formData).
    subscribe({
      next: (response: any) => {
        this.image = response.image_data_uri;
        this.imagetext = response.text;
        this.imageURL = response.imageurl;
        this.uploadForm = this.fb.group({
          language: ['',Validators.required],
          score: [0,Validators.required],
          text: [this.imagetext,Validators.required],
        })
        this.display = true;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  finalSubmit(){
    this.newdataentry.imageurl = this.imageURL;
    this.newdataentry.language = this.g['language'].value;
    this.newdataentry.score = this.g['score'].value;
    this.newdataentry.text = this.g['text'].value;
    
    this.dataService.addDataEntry(this.newdataentry).
    subscribe({
      next: (response) => {
        this.display = false;
      }
    })
  }

}