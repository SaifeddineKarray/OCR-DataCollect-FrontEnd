import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { dataentry } from '../models/data/dataentry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  webAPIUrl: string = environment.dotnetApiUrl;

  constructor(private http: HttpClient) { }

  getAllEntries(): Observable<dataentry[]> {
    return this.http.get<dataentry[]>(this.webAPIUrl + '/api/Data')
  }
}
