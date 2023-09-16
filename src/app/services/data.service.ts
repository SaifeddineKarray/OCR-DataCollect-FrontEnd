import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { dataentry } from '../models/data/dataentry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  webAPIUrl: string = environment.dotnetApiUrl;

  constructor(private http: HttpClient) {}

  getAllEntries(): Observable<dataentry[]> {
    return this.http.get<dataentry[]>(this.webAPIUrl + '/api/Data');
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(this.webAPIUrl + '/api/Data/upload-image', formData);
  }

  addDataEntry(newdataentry: dataentry): Observable<dataentry> {
    return this.http.post<dataentry>(
      this.webAPIUrl + '/api/Data',
      newdataentry
    );
  }

  extractText(formData: FormData): Observable<any> {
    return this.http.post(this.webAPIUrl + '/api/Data/extract-text', formData);
  }

  updateEntry(id: string, newdataentry: dataentry){
    return this.http.put(this.webAPIUrl + `/api/Data/${id}`, newdataentry);
  }

  deleteByID(id: string){
    return this.http.delete(this.webAPIUrl + `/api/Data/${id}`);
  }
}
