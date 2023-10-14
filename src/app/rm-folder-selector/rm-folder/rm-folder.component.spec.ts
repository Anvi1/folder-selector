import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmFolderComponent } from './rm-folder.component';

describe('RmFolderComponent', () => {
  let component: RmFolderComponent;
  let fixture: ComponentFixture<RmFolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmFolderComponent]
    });
    fixture = TestBed.createComponent(RmFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
