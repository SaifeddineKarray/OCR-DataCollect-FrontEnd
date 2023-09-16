import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    updateUser(user: User) {
        return this.http.put(`${environment.apiUrl}/users/UpdateUser`, user)
      }
     
    deleteUserById(id:string){
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}