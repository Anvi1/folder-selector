// utils that can be used accross the application

import { Folder, FolderSelectorRawDataType } from "../folder-selector-interfaces/folder-selector-items";

export function fillEmptyNames(data: FolderSelectorRawDataType[]) {
  data.forEach((item) => {
    if (item[1] === "") {
      const allVersions = groupSameParentValues(data, item[2]);
      const stableVersions = allVersions.filter((item) => item !== "");
      const lastCharactersArray: number[] = stableVersions.map((item) => parseInt(item.slice(-1), 10));
      const missingVersionVal = missingNodeVersion(lastCharactersArray);

      if (item[2] === null) {
        item[1] = 'Node ' + missingVersionVal;
      } else {
        const getMajorVersion = data.find((folder) => folder[0] === item[2]);
        const missingVersion = getMajorVersion ? getMajorVersion[1] + '.' + missingVersionVal : 'Node x';
        item[1] = missingVersion;
      }
    }
  });

  return sortDataWithNames(data);
}

function missingNodeVersion(arr: number[]) {
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

  return missingNumbers;
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

export function filterDate(dataCreatedData: string) {
  const dateToCompareFrom = new Date('2023-05-01T00:00:00+00:00');
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