import { TestBed } from '@angular/core/testing';

import { FolderSelectorApiService } from './folder-selector-api.service';

describe('FolderSelectorApiService', () => {
  let service: FolderSelectorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderSelectorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
