export interface ColumnType {
    id: string;
    type: string;
    nullable: boolean;
}

export interface FolderSelectorResponse {
    columns: ColumnType[];
    data: FolderSelectorRawDataType[]
}

export interface FolderSelectorRawData {
    data: FolderSelectorRawDataType[]
}

export interface FolderSelectorRawDataType {
    0: number;
    1: string;
    2: number | null;
    3: string;
}

export interface Folder {
    id: number;
    created: string;
    name: string;
    parent: number | null;
    isCollapsed?: boolean;
    isActive?: boolean;
    isInderminate?: boolean;
    subFolder: Folder[];
    padding: string;
}


