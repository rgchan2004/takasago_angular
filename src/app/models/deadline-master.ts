import { SimpleResponse } from "./simple-response";

export interface DeadlineMaster {
    deadlineID: number;
    documentType: string;
    deptOwner: string;
    deadlineWorkingDay: number;
    dtCreated: string;
    dtModified: string;
    checked: boolean; //optional
    remarks:string; //optional
    documentName:string; //optional
    deadlineDate:  Date | string;
}

export interface DeadlineMasterResponse extends SimpleResponse {
    deadlineMasterList: DeadlineMaster[];
}

export interface DeadlineMasterLoadResponse extends SimpleResponse {
    deadlineMasterDetails: DeadlineMaster;
}

export interface DocumentTypeMasterLoadResponse extends SimpleResponse {
    documentTypeMasterDetails: DocumentTypeMaster;
}

export interface DocumentTypeMasterResponse extends SimpleResponse {
    documentTypeMasterList: DocumentTypeMaster[];
}

export interface DocumentTypeMaster {
    ID: number;
    documentType: string;
    depptOwner: string;
    deadline: number;
    assignToDeptt: string;
    dtCreated: string;
    dtModified: string;
    checked: boolean; //optional
    remarks:string; //optional
    documentName:string; //optional
    deadlineDate:  Date | string; //optional
}