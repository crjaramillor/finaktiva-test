import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventLog } from '../models/eventlog';

@Injectable({
  providedIn: 'root'
})
export class EventlogService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener eventos con filtros
  getFilteredEvents(params: any): Observable<EventLog[]> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<EventLog[]>(`${this.apiUrl}/eventsList`, { params: httpParams });
  }

  addEventLog(event: { description: string; type: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/newEvent`, event);
  }
}
