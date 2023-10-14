import { TestBed } from '@angular/core/testing';

import { FolderSelectorService } from './folder-selector.service';

describe('FolderSelectorService', () => {
  let service: FolderSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
