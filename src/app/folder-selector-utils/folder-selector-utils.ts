// utils that can be used accross the application

import { Folder, FolderSelectorRawDataType } from "../folder-selector-interfaces/folder-selector-items";

export function filterDataWithNoNames(dataToFilter: FolderSelectorRawDataType[]) {
    return dataToFilter.filter(item => item[1] !== "")
}

export function sortDataWithNames(dataToSort: FolderSelectorRawDataType[]) {
    return dataToSort.sort((item1, item2) => item2[1].localeCompare(item1[1]));
}

export function filterDate(dataCreatedData: string) {
    const dateToCompareFrom = new Date('2023-05-01T00:00:00+00:00');
    const createdDate = new Date(dataCreatedData); 
    return createdDate < dateToCompareFrom;
}

export function findFolderById(id: number, data : Folder[]) {
    const stack: any[] = [...data];
    while (stack.length > 0) {
      const folder = stack.pop();
      if (folder.id === id) {
        return folder;
      }
      if (folder.subFolder) {
        stack.push(...folder.subFolder);
      }
    }
    return null;
}

export function addPaddingToData(data: Folder[], paddingValue: number = 20, level: number = 1) {
    for (const item of data) {
      item.padding = `${level * paddingValue}px`;
      addPaddingToData(item.subFolder, paddingValue, level + 1);
    }
}