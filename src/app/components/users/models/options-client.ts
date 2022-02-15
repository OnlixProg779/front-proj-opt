import { LocalDataSource } from "ng2-smart-table";

export class OptionsClient {
    constructor() {
        this.source = new LocalDataSource();
    }

    public settings; // Setting para la tabla
    public source: LocalDataSource;
    public pageSize: number = 15;
    public currentPage: number = 1;
    public showPerPage: number = 5;
    public totalCount: number = 0;
    // media type
    public auxMediaTypeAccept: string = null;
    public auxMediaTypeContentType: string = null;
    // parameters de busqueda
    public type: string = null;
    public searchQuery: string = null;
    public serie: number = null;
    
    // ordenamiento
    public orderBy: string = null;
    // campos
    public fields: string = null;
}
