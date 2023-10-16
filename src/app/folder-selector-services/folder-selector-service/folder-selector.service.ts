import { Injectable } from '@angular/core';
import { FolderSelectorApiService } from '../api-service/folder-selector-api.service';
import { Folder, FolderSelectorRawDataType, FolderSelectorResponse } from '../../folder-selector-interfaces/folder-selector-items';
import { Observable, map } from 'rxjs';
import { fillEmptyNames, filterDate } from 'src/app/folder-selector-utils/folder-selector-utils';

@Injectable({
  providedIn: 'root'
})
export class FolderSelectorService {

  constructor(private apiService: FolderSelectorApiService) { }

  getMappedData(): Observable<Folder[]> {
    return this.apiService.fetchData().pipe(
      map((response: FolderSelectorResponse) => this.processResponseData(response.data)),
    );
  }

  private processResponseData(responseData: FolderSelectorRawDataType[]): Folder[] {
    const filteredData = fillEmptyNames(responseData); // Filter out items with empty names
    return this.mapData(filteredData);
  }

  mapData(responseData: FolderSelectorRawDataType[], parentId: number | null = null, depth: number = 0): Folder[] {
    if (depth >= 5) { // Added a constraint to set level till which level of subfolder to see data
      return [];
    }
    return responseData
      .filter(item => item[2] === parentId)
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
          subFolder: this.mapData(responseData, id, depth + 1),
          padding: ''
        };
      });
  }

}
