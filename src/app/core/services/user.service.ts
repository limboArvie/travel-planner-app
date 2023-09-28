import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRoot = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiRoot}/users`);
  }

  public get(param: any): Observable<User> {
    return this.http.get<User>(`${this.apiRoot}/users`, {params: param});
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiRoot}/users/${id}`);
  }

  public add(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiRoot}/users`, user);
  }

  public delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiRoot}/users/${id}`);
  }

  public getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
}
