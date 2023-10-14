// rm-folder.component.ts
// This component displays each folder item and update selection and
// emit click event to parent component corresponding to each item.
// This is a reusable component.

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from '../../folder-selector-interfaces/folder-selector-items';

@Component({
selector: 'rm-folder',
templateUrl: './rm-folder.component.html',
styleUrls: ['./rm-folder.component.css']
})
export class RmFolderComponent {

  @Input() folderData!: Folder;
  @Output() resetSelectionEvent = new EventEmitter();
  @Output() updateParentSelectionEvent = new EventEmitter<Folder>();
  @Output() updateChildrenSelectionEvent = new EventEmitter<Folder>();

  data: Folder[] = [];

  /**
 * Clear selected/activated folders and select/activate clicked folder when user clicks area other than toggle & checkbox.
 */
  clearAllSelectionAndSelectClickedFolder(selectedItem: Folder){
    this.resetSelectionEvent.emit();
    selectedItem.isActive = true;
    this.updateParentSelectionEvent.emit(selectedItem);
  }

  onFolderSelectorCheckBoxChange(selectedItem: Folder) {
      selectedItem.isActive = !selectedItem.isActive;
      selectedItem.isInderminate = false;
      this.updateChildrenSelectionEvent.emit(selectedItem);
      this.updateParentSelectionEvent.emit(selectedItem);
  }

}
