import { SimpleResponse } from "./simple-response";

export interface UserMaster {
    userID: number;
    fullName: string;
    emailID: string;
    password: string;
    documentType: number;
    department: number;
    dtCreated: string;
    dtModified: string;
    txtOtherDeptt: string;
    projectNumber: number;
    approvalFor: string;
    checked: boolean;
}

export interface UserMasterResponse extends SimpleResponse {
    userList: UserMaster[];
}

export interface UserMasterLoadResponse extends SimpleResponse {
    userDetails: UserMaster;
}

export interface genericItem{
    value: number,
    text: string
}
