import { Component, OnInit } from '@angular/core';
import { dataentry } from '../models/data/dataentry.model';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pld-page',
  templateUrl: './pld-page.component.html',
  styleUrls: ['./pld-page.component.css']
})
export class PldPageComponent implements OnInit{
  uploadForm: FormGroup;
  submitted = false;
  error = '';
  newdataentry: dataentry = {
    id: '',
    imageurl: 'test',
    language: '',
    score: 0,
    text: '',
  };

  constructor(private dataService: DataService, public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      language: ['',Validators.required],
      score: [0,Validators.required],
      text: ['',Validators.required],
      file: ['', [Validators.required]],
      fileSource: ['', [Validators.required]]
    })
  }
  
  ngOnInit(): void {}

  get f() { return this.uploadForm.controls; }

  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        fileSource: file
      });
    }
  } 
  
  addEntry(){
    const formData = new FormData();
  
    // Append the file to the FormData
    formData.append('file', this.uploadForm.get('fileSource')?.value);
  
    // Perform the image upload API call
    this.dataService.uploadImage(formData).subscribe({
      next: (imageResponse: any) => {
        // Use the returned image URL or path in the newdataentry
        this.newdataentry.imageurl = imageResponse.imageUrl; // Replace 'imageUrl' with the actual property name
        this.newdataentry.language = this.f['language'].value;
        this.newdataentry.score = this.f['score'].value;
        this.newdataentry.text = this.f['text'].value;

        this.dataService.addDataEntry(this.newdataentry)
        .subscribe({
        next: (newdataentry) => {
          console.log(newdataentry);
          this.dataService.extractText(formData).subscribe({
            next: (response) => {console.log(response)}
          });
          this.uploadForm.reset();
          }
        });
      }
    });
  }

  // showPreview(event: Event) {
  //   const file = (event.target as HTMLInputElement).files.[0];
  //   this.uploadForm.patchValue({
  //     avatar: file
  //   });
  //   this.uploadForm.get('avatar').updateValueAndValidity()
  //   // File Preview
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageURL = reader.result as string;
  //   }
  //   reader.readAsDataURL(file)
  // }

  // showPreview(event: Event): void {
  //   const file = (event.target as HTMLInputElement)?.files?.[0];
  
  //   if (file) {
  //     this.uploadForm.patchValue({
  //       avatar: file
  //     });
  //     const avatarControl = this.uploadForm.get('avatar');

  //     if (avatarControl) {
  //       avatarControl.updateValueAndValidity();
  //     }  
  //     // File Preview
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageURL = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
}
