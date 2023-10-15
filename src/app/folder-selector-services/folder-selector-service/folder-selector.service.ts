import { Injectable } from '@angular/core';
import { FolderSelectorApiService } from '../api-service/folder-selector-api.service';
import { Folder, FolderSelectorRawDataType, FolderSelectorResponse } from '../../folder-selector-interfaces/folder-selector-items';
import { Observable, catchError, map } from 'rxjs';
import { filterDataWithNoNames, filterDate, sortDataWithNames } from 'src/app/folder-selector-utils/folder-selector-utils';

@Injectable({
  providedIn: 'root'
})
export class FolderSelectorService {

  constructor(private apiService: FolderSelectorApiService) { }

  getMappedData(): Observable<Folder[]> {
    return this.apiService.fetchData().pipe(
      map((response: FolderSelectorResponse) => {
              response.data = filterDataWithNoNames(response.data);
              sortDataWithNames(response.data);
              return this.mapData(response.data);
        }),
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return [];
      })
    );
  }
  
  mapData(responseData: FolderSelectorRawDataType[] , parentId: number | null = null): Folder[] {
    return responseData
      .filter(item =>  item[2] === parentId)
      .map(item => {
        const id = item[0];
        const name = item[1];
        const parent = item[2];
        const created = item[3];
        
        const collapsible = filterDate(item[3]);

        return {
          id,
          created,
          name,
          parent,
          isActive: false,
          isCollapsed: collapsible,
          isInderminate: false,
          subFolder: this.mapData(responseData, id),
          padding:''
        };
      });
  }
  
}
