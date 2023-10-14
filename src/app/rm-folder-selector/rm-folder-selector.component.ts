/**
 * RmFolderSelectorComponent is responsible for handling the folder selector feature.
 * It fetches folder data and manages user interactions.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Folder } from '../folder-selector-interfaces/folder-selector-items';
import { Subscription } from 'rxjs';
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

  constructor(private folderSelectorService: FolderSelectorService){
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
    else{
      this.getFolderSelectorDataSubscription = this.folderSelectorService.getMappedData().subscribe(mappedData => {
        this.data = mappedData;
        addPaddingToData(mappedData);
        sessionStorage.setItem('folderSelectorData', JSON.stringify(mappedData));
      });
    }
  }


  /**
 * Handles changes in folder selection and updates child folders accordingly.
 */
  updateChildrenSelection(selectedItem: Folder){
    const isSelected = selectedItem.isActive;
    if (selectedItem.subFolder && !isSelected) {
          selectedItem.subFolder.forEach((subfolder) => {
           subfolder.isActive = isSelected;
           subfolder.isInderminate = isSelected;
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
        const anyChildrenSelected = parentFolder?.subFolder.some((child: any) => (child.isActive || child.isInderminate));
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
    this.getFolderSelectorDataSubscription.unsubscribe();
  }

}
