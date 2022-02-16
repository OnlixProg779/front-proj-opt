import { LocalDataSource } from "ng2-smart-table";

export class OptionsCreditMovement {
    constructor(){
        this.source = new LocalDataSource();
    }

    public settings; // Setting para la tabla
    public source: LocalDataSource;
    public pageSize: number = 15;
    public currentPage: number = 1;
    public showPerPage: number = 5;
    public totalCount: number = 0;
    // media type
    public auxMediaTypeAccept: string= null;
    public auxMediaTypeContentType: string = null;
    // parameters de busqueda
    public searchQuery:string= null; //
    public depositDate: Date = null; // DateTime?
    public document: string = null;
    public value: number = null;
    public bankAccountId: string = null;

    public creditReasonId: string = null;
    public creditMovementStatusId: string = null;
    public userId: string = null;
    public active:boolean = null;
    // ordenamiento
    public orderBy:string = null;
    // campos
    public fields: string=null;
}
