export interface SimpleResponse {
    msgFlag: boolean;
    message: string;
    id: number;
    msgInt: number;
    mailSendEmailIdList: mailSendEmailIds[];
}
export interface mailSendEmailIds {
    emailId: string;
    docType: string;
}