/**
 * RmFolderSelectorComponent is responsible for handling the folder selector feature.
 * It fetches folder data and manages user interactions.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Folder } from '../folder-selector-interfaces/folder-selector-items';
import { Subscription, catchError } from 'rxjs';
import { FolderSelectorService } from '../folder-selector-services/folder-selector-service/folder-selector.service';
import { addPaddingToData, findFolderById } from '../folder-selector-utils/folder-selector-utils';

@Component({
  selector: 'rm-folder-selector',
  templateUrl: './rm-folder-selector.component.html',
  styleUrls: ['./rm-folder-selector.component.css']
})
export class RmFolderSelectorComponent implements OnInit, OnDestroy {

  public data!: Folder[];
  public storedData = sessionStorage.getItem('folderSelectorData'); // Holds previously stored data from sessionStorage.

  getFolderSelectorDataSubscription: Subscription = new Subscription;
  includeSubFoldersCheck: boolean = false;
  displayError: boolean = false;

  constructor(private folderSelectorService: FolderSelectorService) {
  }

  ngOnInit() {
    /*** Fetching folder selector data during component initialization*/
    this.getFolderSelectorData();
  }

  getFolderSelectorData() {
    if (this.storedData) {
      const parsedData = JSON.parse(this.storedData);
      this.data = parsedData;
    }
    else {
      this.getFolderSelectorDataSubscription = this.folderSelectorService.getMappedData()
        .pipe(
          catchError((error) => {
            console.error('An error occurred:', error);
            this.displayError = true;
            return [];
          })
        )
        .subscribe(mappedData => {
          this.data = mappedData;
          this.displayError = false;
          addPaddingToData(mappedData);
          sessionStorage.setItem('folderSelectorData', JSON.stringify(mappedData));
        }
        );
    }
  }

  includeSubFolders() {
    this.includeSubFoldersCheck = !this.includeSubFoldersCheck;
  }

  checkAnyChildrenSelected(folder: Folder): boolean {
    return folder?.subFolder.some((child: any) => (child.isActive || child.isInderminate));
  }


  /**
  * Handles changes in current folder selection, Parent & Child Selections.
  */
  updateCurrentSelection(selectedItem: Folder) {
    const anyChildrenSelected = this.checkAnyChildrenSelected(selectedItem);
    selectedItem.isInderminate = (anyChildrenSelected && !selectedItem.isActive && !this.includeSubFoldersCheck) ? true : false;
    this.updateChildrenSelection(selectedItem);
    this.updateParentSelection(selectedItem);
  }


  /**
  * Handles changes in folder selection and updates child folders accordingly.
  */
  updateChildrenSelection(selectedItem: Folder) {
    const isSelected = selectedItem.isActive;
    if (selectedItem.subFolder && this.includeSubFoldersCheck) {
      selectedItem.subFolder.forEach((subfolder) => {
        subfolder.isActive = isSelected;
        subfolder.isInderminate = false;
        this.updateChildrenSelection(subfolder);
      });
    }
  }


  /**
  * Handles changes in folder selection and updates parent folders accordingly.
  */
  updateParentSelection(selectedItem: Folder) {
    if (selectedItem.parent !== null) {
      const parentFolder = findFolderById(selectedItem.parent, this.data);
      if (parentFolder) {
        const anyChildrenSelected = this.checkAnyChildrenSelected(parentFolder);
        parentFolder.isInderminate = (!parentFolder.isActive && anyChildrenSelected) ? true : false;
        this.updateParentSelection(parentFolder);
      }
    }
  }

  /**
 * Resets data when user clicks area other than toggle & checkbox.
 */
  resetSelection(data: Folder[]) {
    for (const item of data) {
      item.isActive = false;
      item.isInderminate = false;
      if (item.subFolder) {
        this.resetSelection(item.subFolder);
      }
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the data subscription
    if (this.getFolderSelectorDataSubscription) {
      this.getFolderSelectorDataSubscription.unsubscribe();
    }
  }

}
