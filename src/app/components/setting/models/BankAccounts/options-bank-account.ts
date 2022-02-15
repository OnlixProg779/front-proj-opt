import { LocalDataSource } from "ng2-smart-table";

export class OptionsBankAccount {
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
    public searchQuery: string = null;
    public accountNumber: string = null;
    public accountAlias: string = null;
    public employeeReferenceId: string = null;
    public accountOwner: string = null;
    public dniAccountOwner: string = null;
    public active: boolean = null;
    public accountTypeId: string = null;
    public bankId: string = null;
    // ordenamiento
    public orderBy: string = null;
    // campos
    public fields: string = null;
}
