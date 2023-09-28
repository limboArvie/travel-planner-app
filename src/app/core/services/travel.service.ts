import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from 'src/app/shared/models/travel.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private apiRoot = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${this.apiRoot}/travels`);
  }

  public getById(id: number): Observable<Travel> {
    return this.http.get<Travel>(`${this.apiRoot}/travels/${id}`);
  }

  public add(travel: Travel): Observable<Travel> {
    return this.http.post<Travel>(`${this.apiRoot}/travels`, travel);
  }

  public update(travel: Travel): Observable<Travel> {
    return this.http.put<Travel>(`${this.apiRoot}/travels/${travel.id}`, travel);
  }

  public delete(id: number): Observable<Travel> {
    return this.http.delete<Travel>(`${this.apiRoot}/travels/${id}`);
  }
}
