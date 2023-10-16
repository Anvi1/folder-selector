// utils that can be used accross the application

import { Folder, FolderSelectorRawDataType } from "../folder-selector-interfaces/folder-selector-items";

const dateToCompare = '2023-05-01T00:00:00+00:00';

export function filterData(data: FolderSelectorRawDataType[]) {
  filterNames(data);
  return sortDataWithNames(data);
}

function filterNames(data: FolderSelectorRawDataType[]) {
  data.forEach((item, index) => {
    item[2] = convertParentToNumber(item[2]);
    if (item[1] === "") {
      if (item[2] === null) {
        item[1] = getMissingParentVersion(data, item);
      } else {
        getMissingChildVersion(data, item, index);
      }
    }
  });
}

function getMissingParentVersion(data: FolderSelectorRawDataType[], item: FolderSelectorRawDataType) {
  const missingVersionVal = getMissingNodeVersion(data, item);
  const getMinorVersion = data.find((folder) => folder[2] === item[0]);
  const missingVersion = getMinorVersion ? getMissingMajorVersion(getMinorVersion[1]) : 'Node ' + missingVersionVal;
  return missingVersion;
}

function getMissingChildVersion(data: FolderSelectorRawDataType[], item: FolderSelectorRawDataType, index: number) {
  const missingVersionVal = getMissingNodeVersion(data, item);
  let getMajorVersion = data.find((folder) => folder[0] === item[2]);
  let getMajorVersionName = getMajorVersion ? getMajorVersion[1] : '';
  if(getMajorVersion && !getMajorVersion[1]){
    getMajorVersionName = getMissingParentVersion(data, getMajorVersion);
  }
  const missingVersion = getMajorVersion ? getMajorVersionName + '.' + missingVersionVal : 'Node ' + missingVersionVal;
  data[index][1] = missingVersion;
}

function getMissingNodeVersion (data:FolderSelectorRawDataType[], item: FolderSelectorRawDataType){
  const allVersions = groupSameParentValues(data, item[2]);
  const stableVersions = allVersions.filter((item) => item !== "");
  const lastCharactersArray: number[] = stableVersions.map((item) => parseInt(item.slice(-1), 10));
  return missingNodeVersionVal(lastCharactersArray);

}

function getMissingMajorVersion(getMinorVersion: string) {
  const lastDotIndex = getMinorVersion.lastIndexOf('.');
  return getMinorVersion.slice(0, lastDotIndex);
}

function missingNodeVersionVal(arr: number[]) {
  const missingNumbers: number[] = [];
  const sortedArr = arr.sort((a, b) => a - b);

  if (sortedArr.length === 0) {
    return 1;
  }

  const min = sortedArr[0];
  const max = sortedArr[sortedArr.length - 1];

  for (let num = min; num <= max; num++) {
    if (sortedArr.indexOf(num) === -1) {
      return num;
    }
  }

  if (missingNumbers.length === 0) {
    // Nothing is missing, return +1 of the highest value
    const highestValue = max;
    return highestValue + 1;
  }

  return 0;
}

function groupSameParentValues(arrays: any[], valueToGroupBy: number | null) {
  const groupedValues: string[] = [];
  for (const array of arrays) {
    if (array[2] === valueToGroupBy) {
      groupedValues.push(array[1]);
    }
  }
  return groupedValues;
}

export function sortDataWithNames(dataToSort: FolderSelectorRawDataType[]) {
  dataToSort.sort((a, b) => {
    return b[1].localeCompare(a[1]);
  });
  return dataToSort;
}

function convertParentToNumber(item: any) {
  return item !== null && !isNaN(item) ? parseFloat(item) : null;
}

export function filterDate(dataCreatedData: string) {
  const dateToCompareFrom = new Date(dateToCompare);
  // Check if date is empty and if empty fill it with date to compare
  dataCreatedData = !dataCreatedData ? dateToCompare : dataCreatedData;
  const createdDate = new Date(dataCreatedData);
  return createdDate < dateToCompareFrom;
}

export function findFolderById(id: number, data: Folder[]) {
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