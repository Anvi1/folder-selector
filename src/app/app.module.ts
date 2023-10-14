import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RmFolderSelectorComponent } from './rm-folder-selector/rm-folder-selector.component';
import { FolderSelectorService } from './folder-selector-services/folder-selector-service/folder-selector.service';
import { RmFolderComponent } from './rm-folder-selector/rm-folder/rm-folder.component';

@NgModule({
  declarations: [
    AppComponent,
    RmFolderSelectorComponent,
    RmFolderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [FolderSelectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
