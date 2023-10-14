import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FolderSelectorResponse } from '../../folder-selector-interfaces/folder-selector-items';

@Injectable({
  providedIn: 'root'
})
export class FolderSelectorApiService {

  private apiUrl = 'assets/response.json'; 

  constructor(private http: HttpClient) {}

  fetchData(): Observable<FolderSelectorResponse> {
    return this.http.get<FolderSelectorResponse>(this.apiUrl);
  }
}
