# RmFsApp

# Prerequisites:
1. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

2. Node version v19.6.0

3. npm version 9.4.0

4. Run `npm install` inside root directory to download node modules. 

5. Additional package is installed for using Font awesome icons locally. This is used for installing fa icon used as toggle button in application. Dependency is added in package.json. If this somehow throws error while 'npm install' because of version issues, then remove it from package.json, remove import from styles.css, do 'npm install' wihout it and to access fa icons uncomment line number 9 in index.html file. index.html file includes font-awesome style sheet source link, so internet connection is required to access the icon in this case.

6. If some error persists while 'npm install', try deleting 'package-lock.json' file and then run 'npm install' again.


# Description:

1. Code structure follows full utilization of Angular component based structure to make code as clean, maintainable and understandable as possible. Includes Services, Interfaces, Utils, Smart Component and Dumb component. Communication between child and parent components is facilitated using @Input and @Output decorators. 

2. This application displays multi-dimensional folder structure and enable user to activate/deactivate the state of item by clicking checkbox.

3. User can toggle through the hierarchy of folders from root folders. This data is displayed in a recursive way keeping in mind 'n' number of folder-subfolder structure. By default Folders which are created before 2023-05-01 are in *expanded* mode.

4. Reset option is also available if user clicks area outside checkbox and toggle, deselect exixting folders/subfolders and select clicked one. 

5. Shows an indeterminate state if parent folder/folders are inactive and subfolder is activated.

6. List is sorted by Names in descending order. Empty folder names were updated with the possible missing versions from the siblings list.  

7. Performs session storage of data to cache it session wise, making API calls as minimum as possible since the data is static and not changeable. 

8. After "Including SubFolders" option is enabled, sub-folders will also be checked/unchecked based on the action of parent folder. Enabling "Including Subfolder" option will not change the state of current selection but will affect the future actions performed on parent folders.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
