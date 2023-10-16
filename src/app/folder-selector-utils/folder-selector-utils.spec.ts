import { filterDate, sortDataWithNames } from './folder-selector-utils';
import { FolderSelectorRawDataType } from '../folder-selector-interfaces/folder-selector-items';

describe('sortDataWithNames', () => {
  it('should sort data with names in descending order', () => {
    const dataToSort : FolderSelectorRawDataType[] = [
      [4, "Name 4", null, "12"],
      [1, "Name 1", null, "12"],
      [3, "Name 3", null, "12"],
      [2, "Name 2", null, "12"]
    ];
    const sortedData = sortDataWithNames(dataToSort);
    expect(sortedData).toEqual([
      [1, "Name 1", null, "12"],
      [2, "Name 2", null, "12"],
      [3, "Name 3", null, "12"],
      [4, "Name 4", null, "12"]
    ]);
  });
});

describe('filterDate', () => {
  it('should return true for dates before 2023-05-01', () => {
    const testDate = '2023-01-10T00:00:00+00:00';
    const result = filterDate(testDate);
    expect(result).toBe(true);
  });

  it('should return false for dates on 2023-05-01', () => {
    const testDate = '2023-05-01T00:00:00+00:00';
    const result = filterDate(testDate);
    expect(result).toBe(false);
  });

  it('should return false for dates on 2023-05-01', () => {
    const testDate = '2023-08-10T00:00:00+00:00';
    const result = filterDate(testDate);
    expect(result).toBe(false);
  });
});
