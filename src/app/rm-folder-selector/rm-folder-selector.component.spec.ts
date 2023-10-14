import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmFolderSelectorComponent } from './rm-folder-selector.component';

describe('RmFolderSelectorComponent', () => {
  let component: RmFolderSelectorComponent;
  let fixture: ComponentFixture<RmFolderSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmFolderSelectorComponent]
    });
    fixture = TestBed.createComponent(RmFolderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
